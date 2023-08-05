const filterProdsNewArrival = (productsForFilter) =>
  productsForFilter.filter(
    (product) => product.newArrival === true && product.quantity !== 0
  );

module.exports = filterProdsNewArrival;
