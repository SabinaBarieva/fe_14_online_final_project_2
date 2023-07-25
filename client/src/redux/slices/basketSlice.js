import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from './loginSlice';
import { getCart, updateCart } from '../../api/cart';
// import { getCart, updateCart } from '../../api/cart';

export const basketProductCreator = ({ product, cartQuantity }) => ({
  product,
  cartQuantity,
});

const calcBasketPriceSum = (productsInBasket) =>
  productsInBasket.reduce(
    (sum, { product, cartQuantity }) =>
      product.currentPrice * cartQuantity + sum,
    0
  );
const findProductInBasket = (productToFind, productsInBasket) =>
  productsInBasket.find(
    ({ product }) => product.itemNo === productToFind.product.itemNo
  );
const createRemoteCartProduct = (product, cartQuantity) => {
  const idKey = '_id';
  return {
    product: product[idKey],
    cartQuantity,
  };
};
const initialState = {
  priceAll: 0,
  itemsBasket: [],
  modal: false,
  modalText: '',
};
const mergeBasket = createAsyncThunk(
  'basket/merge',
  async (_, { getState }) => {
    try {
      const idKey = '_id';
      const localBasket = getState().basket.itemsBasket;
      const remoteBasket = await getCart();
      //   if (remoteBasket === null) remoteBasket = [];
      //   else remoteBasket = remoteBasket.products;
      const cartToUpdate = [];
      localBasket.forEach(
        ({ product: localProduct, cartQuantity: localQuantity }) => {
          let totalQuantity = localQuantity;
          const productId = localProduct[idKey];
          const foundedProduct = remoteBasket.find(
            ({ product: { _id: remoteId } }) => remoteId === productId
          );
          if (foundedProduct) {
            const remoteQuantity = foundedProduct.cartQuantity;
            if (totalQuantity < remoteQuantity) totalQuantity += remoteQuantity;
          }
          cartToUpdate.push(
            createRemoteCartProduct(localProduct, totalQuantity)
          );
        }
      );
      const cart = await updateCart({ products: cartToUpdate });
      console.log(cart);
      return cart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
// export const increaseProductQuantity = (currentQuantity, availableQuantity) => {
//   if (currentQuantity !== availableQuantity) {
//     return currentQuantity + 1;
//   }
//   throw new Error('Not enought');
// };
export const increaseQuantity = createAsyncThunk(
  'add-to-basket',
  async ({ product }, { getState }) => {
    const token = getToken();
    const isLoggedIn = token && true;
    const { itemsBasket: cart } = getState().basket;
    const currentProductInBasket = findProductInBasket(product, cart);
    const productQuantityInBasket = currentProductInBasket
      ? currentProductInBasket.cartQuantity
      : 0;

    const addToBasketQuantity = product.cartQuantity;
    const availableQuantity = product.product.quantity;
    let newQuantityInBasket = currentProductInBasket;
    if (productQuantityInBasket + addToBasketQuantity <= availableQuantity)
      newQuantityInBasket = productQuantityInBasket + addToBasketQuantity;
    else
      throw new Error(
        `Sorry, there are only ${availableQuantity} units of this product in stock`
      );
    if (isLoggedIn) {
      const remoteCart = await updateCart(
        createRemoteCartProduct(product, newQuantityInBasket)
      );
      return remoteCart;
    }
    if (currentProductInBasket) {
      currentProductInBasket.cartQuantity = newQuantityInBasket;
    } else {
      cart.push(
        basketProductCreator({ product: product.product, addToBasketQuantity })
      );
    }
    return cart;
  }
);

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, { payload: currentProduct }) => {
      const { itemsBasket: basket } = state;
      const product = findProductInBasket(currentProduct, basket);
      if (product) {
        if (product.cartQuantity !== product.product.quantity) {
          product.cartQuantity += 1;
        } else {
          state.modal = true;
          state.modalText = `Sorry, there are only ${product.quantity} units of this product in stock`;
        }
      } else {
        basket.push({ ...currentProduct, cartQuantity: 1 });
      }
      state.priceAll = calcBasketPriceSum(basket);
    },
    minusItem: (state, { payload: currentProduct }) => {
      const { itemsBasket: basket } = state;
      const product = findProductInBasket(currentProduct, basket);
      if (product) {
        product.cartQuantity -= 1;
      }
      state.priceAll = calcBasketPriceSum(basket);
    },
    deleteBasket: (state, { payload: { product: productToDelete } }) => {
      state.itemsBasket = state.itemsBasket.filter(
        ({ product }) => product.itemNo !== productToDelete.itemNo
      );
      state.priceAll = calcBasketPriceSum(state.itemsBasket);
    },
    clearBasket: (state) => {
      state.itemsBasket = [];
      state.priceAll = 0;
    },
    addSeveraltoBasket: (state, { payload: currentProduct }) => {
      const { itemsBasket: basket } = state;
      const product = findProductInBasket(currentProduct, basket);
      if (product) {
        const totalProductToBasket =
          currentProduct.cartQuantity + product.cartQuantity;
        if (
          totalProductToBasket > product.product.quantity &&
          product.product.quantity - product.cartQuantity !== 0
        ) {
          state.modalText = `You can't add more than ${
            product.quantity - product.count
          }`;
          state.modal = true;
        } else if (product.cartQuantity !== product.product.quantity) {
          product.cartQuantity += currentProduct.cartQuantity;
        } else {
          state.modal = true;
          state.modalText = `Sorry, there are only ${product.quantity} units of this product in stock`;
        }
      } else {
        basket.push({
          ...currentProduct,
          cartQuantity: currentProduct.cartQuantity,
        });
      }
      state.priceAll = calcBasketPriceSum(basket);
    },
    closeModalBasket: (state) => {
      state.modal = false;
      state.modalText = '';
    },
    updateBasket: (state, { payload: products }) => {
      state.itemsBasket = products;
      state.priceAll = calcBasketPriceSum(products);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      action.asyncDispatch(mergeBasket());
    });
    builder.addCase(mergeBasket.fulfilled, (state, action) => {
      state.itemsBasket = action.payload;
      state.priceAll = calcBasketPriceSum(state.itemsBasket);
    });
    builder.addCase(increaseQuantity.fulfilled, (state, action) => {
      state.itemsBasket = action.payload;
      state.priceAll = calcBasketPriceSum(action.payload);
    });
    builder.addCase(increaseQuantity.rejected, (state, { error }) => {
      console.log(error);
      state.modalText = 'ERROORRR';
      state.modal = true;
    });
  },
});

export const {
  addToBasket,
  deleteBasket,
  clearBasket,
  minusItem,
  addSeveraltoBasket,
  closeModalBasket,
  updateBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
