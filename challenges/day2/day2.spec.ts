import {getScore, Strategy} from './day2';

describe('testsuite Day 2', () => {
  const testInput = 'challenges/day2/input/test.txt';

  it('should calculate score when following strategy from part one', async () => {
    const score = await getScore(testInput, Strategy.PART_ONE);
    expect(score).toBe(15);
  });

  it('should calculate score when following strategy from part two', async () => {
    const score = await getScore(testInput, Strategy.PART_TWO);
    expect(score).toBe(12);
  });
});
