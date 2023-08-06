const shuffleArray = require('./shuffleArray');
describe('shuffleArray', () => {
  it('should not change the length of the array', () => {
    const originalArray = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray(originalArray);

    expect(shuffledArray.length).toBe(originalArray.length);
  });

  it('should contain all the elements from the original array', () => {
    const originalArray = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray(originalArray);

    originalArray.forEach((element) => {
      expect(shuffledArray).toContain(element);
    });
  });

  it('should not modify the original array', () => {
    const originalArray = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray(originalArray);

    expect(shuffledArray).not.toBe(originalArray);
  });
});
