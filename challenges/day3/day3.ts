import * as fs from 'fs';
import * as readline from 'readline';

const file = (path: string) =>
  readline.createInterface({
    input: fs.createReadStream(path),
    output: process.stdout,
    terminal: false,
  });

const alphabet: string[] =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const getPriorityOfLine = (items: string[]): number => {
  const compOne = items.slice(0, items.length / 2);
  const compTwo = items.slice(items.length / 2, items.length);
  const item = compOne.find(item => compTwo.indexOf(item) >= 0) || '';
  return alphabet.indexOf(item) + 1;
};

const getPriorityOfGroup = (rucksacks: string[]): number => {
  const elfOneItems = rucksacks[0].split('');
  const elfTwoItems = rucksacks[1].split('');
  const elfThreeItems = rucksacks[2].split('');
  const badgeItem =
    elfOneItems.find(
      item => elfTwoItems.indexOf(item) >= 0 && elfThreeItems.indexOf(item) >= 0
    ) || '';
  return alphabet.indexOf(badgeItem) + 1;
};

// read file and sum up priorities
export const getPrioritySum = async (path: string) =>
  new Promise<number>(res => {
    let sum = 0;
    file(path)
      .on('line', line => {
        sum += getPriorityOfLine(line.split(''));
      })
      .on('close', () => {
        res(sum);
      });
  });

// read file and sum up priorities of groups
export const getPrioritySumOfGroups = async (path: string) =>
  new Promise<number>(res => {
    let sum = 0;
    let group: string[] = [];
    file(path)
      .on('line', line => {
        group.push(line);
        if (group.length === 3) {
          sum += getPriorityOfGroup(group);
          group = [];
        }
      })
      .on('close', () => {
        res(sum);
      });
  });
