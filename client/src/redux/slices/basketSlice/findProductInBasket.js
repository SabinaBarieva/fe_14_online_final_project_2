const findProductInBasket = (productToFind, productsInBasket) =>
  productsInBasket.find(
    ({ product }) => product.itemNo === productToFind.itemNo
  );

export default findProductInBasket;
