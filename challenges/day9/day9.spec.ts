import {getNumberOfPositionsVisitedByTail} from './day9';

describe('testsuite Day 9', () => {
  const testInput = 'challenges/day9/input/test.txt';

  it('should get positions tail visited at least once', async () => {
    const count = await getNumberOfPositionsVisitedByTail(testInput, 2);
    expect(count).toBe(13);
  });

  it('should get positions tail visited at least once with a much larger rope', async () => {
    const count = await getNumberOfPositionsVisitedByTail(testInput, 10);
    expect(count).toBe(1);
  });

  it('should get positions tail visited at least once with a much larger example', async () => {
    const testInput = 'challenges/day9/input/test_larger.txt';
    const count = await getNumberOfPositionsVisitedByTail(testInput, 10);
    expect(count).toBe(36);
  });
});
