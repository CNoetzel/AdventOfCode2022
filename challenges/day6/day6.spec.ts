import {getNumberOfCharactersToFirstMarker} from './day6';

describe('testsuite Day 6', () => {
  const testInput = 'challenges/day6/input/test.txt';

  it('should count number of characters to first packet marker correctly', async () => {
    const number = await getNumberOfCharactersToFirstMarker(testInput, 4);
    expect(number).toBe(7);
  });

  it('should count number of characters to first message marker correctly', async () => {
    const number = await getNumberOfCharactersToFirstMarker(testInput, 14);
    expect(number).toBe(19);
  });
});
