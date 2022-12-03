import {getPrioritySum, getPrioritySumOfGroups} from './day3';

describe('testsuite Day 3', () => {
  const testInput = 'challenges/day3/input/test.txt';

  it('should calculate sum of priorities', async () => {
    const sum = await getPrioritySum(testInput);
    expect(sum).toBe(157);
  });

  it('should calculate sum of priorities for each group', async () => {
    const sum = await getPrioritySumOfGroups(testInput);
    expect(sum).toBe(70);
  });
});
