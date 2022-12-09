import {getHighestScenicScore, getNumberOfVisibleTrees} from './day8';

describe('testsuite Day 8', () => {
  const testInput = 'challenges/day8/input/test.txt';

  it('should get number of visible trees', async () => {
    const count = await getNumberOfVisibleTrees(testInput);
    expect(count).toBe(21);
  });

  it('should get the number of highest scenic score', async () => {
    const count = await getHighestScenicScore(testInput);
    expect(count).toBe(8);
  });
});
