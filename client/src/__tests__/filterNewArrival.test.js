const filterProdsNewArrival = require('../components/Functions/filterNewArrivals/filterNewArrival');

describe('filterProdsNewArrival', () => {
  it('should return an empty array for an empty input', () => {
    const input = [];
    const result = filterProdsNewArrival(input);
    expect(result).toEqual([]);
  });

  it('should return only new products with non-zero quantity', () => {
    const input = [
      { name: 'Product 1', newArrival: true, quantity: 10 },
      { name: 'Product 2', newArrival: false, quantity: 5 },
      { name: 'Product 3', newArrival: true, quantity: 0 },
      { name: 'Product 4', newArrival: true, quantity: 1 },
      { name: 'Product 5', newArrival: false, quantity: 0 },
    ];

    const result = filterProdsNewArrival(input);
    expect(result).toEqual([
      { name: 'Product 1', newArrival: true, quantity: 10 },
      { name: 'Product 4', newArrival: true, quantity: 1 },
    ]);
  });

  it('should return an empty array if there are no new products with non-zero quantity', () => {
    const input = [
      { name: 'Product 1', newArrival: false, quantity: 0 },
      { name: 'Product 2', newArrival: false, quantity: 0 },
      { name: 'Product 3', newArrival: true, quantity: 0 },
    ];

    const result = filterProdsNewArrival(input);
    expect(result).toEqual([]);
  });
});
