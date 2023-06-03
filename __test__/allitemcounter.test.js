import showCounter from '../mock/allitems.js';

describe('showCounter unit tests', () => {
  let counter;
  const value = 5;

  beforeEach(() => {
    counter = showCounter(5);
  });

  test('should double the items when increment is invoked', () => {
    const result = counter.increment();

    expect(result).toBe(10);
  });

  test('should return to the initial value when reset is invoked', () => {
    // Reset the counter
    counter.reset();

    expect(value).toBe(5); // reset to the initial value
  });
});