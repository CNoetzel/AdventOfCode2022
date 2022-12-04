import * as fs from 'fs';
import * as readline from 'readline';

export const enum ContainmentType {
  FULL,
  PARTIAL,
}

const file = (path: string) =>
  readline.createInterface({
    input: fs.createReadStream(path),
    output: process.stdout,
    terminal: false,
  });

const hasOverlap = (sectionPair: string, type: ContainmentType): boolean => {
  const sections = sectionPair.split(',');
  const elveOne = sections[0].split('-').map(s => +s);
  const elveTwo = sections[1].split('-').map(s => +s);
  // check if intersection is possible
  if (elveOne[1] < elveTwo[0] || elveTwo[1] < elveOne[0]) {
    return false;
  }
  // if only partial containments (part 2) should be checked return
  // as we have at least one section overlap
  if (type === ContainmentType.PARTIAL) {
    return true;
  } else {
    // verify that one section fully contains the other
    const secondRangeContainingFirst =
      elveOne[0] >= elveTwo[0] && elveOne[1] <= elveTwo[1];
    const firstRangeContainingSecond =
      elveOne[0] <= elveTwo[0] && elveOne[1] >= elveTwo[1];
    return secondRangeContainingFirst || firstRangeContainingSecond;
  }
};

export const countContainments = async (path: string, type: ContainmentType) =>
  new Promise<number>(res => {
    let count = 0;
    file(path)
      .on('line', line => {
        count += hasOverlap(line, type) ? 1 : 0;
      })
      .on('close', () => {
        res(count);
      });
  });
