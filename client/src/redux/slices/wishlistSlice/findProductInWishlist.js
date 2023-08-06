const findProductInWishlist = (productToFind, productsInWishlist) =>
  productsInWishlist.find(({ itemNo }) => itemNo === productToFind.itemNo);

export default findProductInWishlist;
