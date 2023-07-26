const createRemoteCartProduct = (product, cartQuantity) => {
  const idKey = '_id';
  return {
    product: product[idKey],
    cartQuantity,
  };
};
export default createRemoteCartProduct;
