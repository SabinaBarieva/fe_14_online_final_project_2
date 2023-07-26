// Product
export const currentProduct = (state) => state.product.product;
export const errorInProduct = (state) => state.product.error;
export const currentProductIsLoading = (state) => state.product.isLoading;
//
export const selectWishlist = (state) => state.wishlist;
export const selectCart = (state) => state.basket;
export const modaInProductSlice = (state) => state.modalInProduct;
// All Products in Base
export const allProductsInBase = (state) => state.allProducts.allProds;
export const allProductsIsFetching = (state) => state.allProducts.isFetching;
export const saleProds = (state) => state.allProducts.saleProds;
// Filters
export const categoriesFilter = (state) => state.filters.categories;
export const minimalPrice = (state) => state.filters.minPrice;
export const maximalPrice = (state) => state.filters.maxPrice;
// Products
export const isFetchingProductsList = (state) => state.products.isFetching;
export const totalNumberProducts = (state) => state.products.total;
export const productsList = (state) => state.products.products;
//
export const isBurgerOpen = (state) => state.burgerMenu.openBurger;
export const isFetchingAllProducts = (state) =>
  state.allProdsHomePage.isFetching;
export const homePageProducts = (state) => state.allProdsHomePage.allProds;
// User
export const userData = () => (state) => state.user.user;
// Login
export const isLoggedIn = () => (state) => state.login.login;
