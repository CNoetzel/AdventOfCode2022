import {getCalories} from './day1';

describe('testsuite Day 1', () => {
  const testInput = 'challenges/day1/input/test.txt';

  it('should find the highest calories', async () => {
    const result = await getCalories(testInput, 1);
    expect(result).toBe(24000);
  });

  it('should sum the three highest calories', async () => {
    const result = await getCalories(testInput, 3);
    expect(result).toBe(45000);
  });
});
