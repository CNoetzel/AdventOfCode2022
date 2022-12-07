import {
  sizeOfSmallestDirectoryToDelete,
  sumFolderSizeForThreshold,
} from './day7';

describe('testsuite Day 7', () => {
  const testInput = 'challenges/day7/input/test.txt';

  it('should calculate size of folders', async () => {
    const sum = await sumFolderSizeForThreshold(testInput, 100000);
    expect(sum).toBe(95437);
  });

  it('should return the smallest folder to delete to free space', async () => {
    const count = await sizeOfSmallestDirectoryToDelete(testInput);
    expect(count).toBe(24933642);
  });
});
