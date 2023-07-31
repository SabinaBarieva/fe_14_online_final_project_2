const isProductInWishlist = (wishlist, product) => {
  const idKey = '_id';
  return wishlist.find(({ _id: productId }) => productId === product[idKey]);
};

export default isProductInWishlist;
