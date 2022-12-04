import {ContainmentType, countContainments} from './day4';

describe('testsuite Day 4', () => {
  const testInput = 'challenges/day4/input/test.txt';

  it('should count full containments', async () => {
    const count = await countContainments(testInput, ContainmentType.FULL);
    expect(count).toBe(2);
  });

  it('should count total overlaps in pairs', async () => {
    const count = await countContainments(testInput, ContainmentType.PARTIAL);
    expect(count).toBe(4);
  });
});
