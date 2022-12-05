import {getRearangementOutput, MoverType} from './day5';

describe('testsuite Day 5', () => {
  const testInput = 'challenges/day5/input/test.txt';

  it('should rearange crates correctly with CrateMover 9000', async () => {
    const output = await getRearangementOutput(
      testInput,
      3,
      MoverType.CRATEMOVER_9000
    );
    expect(output).toBe('CMZ');
  });

  it('should rearange crates correctly with CrateMover 9001', async () => {
    const count = await getRearangementOutput(
      testInput,
      3,
      MoverType.CRATEMOVER_9001
    );
    expect(count).toBe('MCD');
  });
});
