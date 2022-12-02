import * as fs from 'fs';
import * as readline from 'readline';

const file = (path: string) =>
  readline.createInterface({
    input: fs.createReadStream(path),
    output: process.stdout,
    terminal: false,
  });

// function to sum up calories carried be each elve
const sumCalories = (path: string): Promise<Array<Number>> =>
  new Promise<Number[]>(res => {
    const calories: Number[] = [];
    let tmpSum = 0;
    file(path)
      .on('line', line => {
        if (line === '') {
          calories.push(tmpSum);
          tmpSum = 0;
        } else {
          tmpSum += +line;
        }
      })
      .on('close', () => {
        calories.push(tmpSum);
        res(calories);
      });
  });

// function to retrieve the sum of highest calories carried by x elves
export const getCalories = async (path: string, numberOfElves: number) => {
  const calories = await sumCalories(path);
  return calories
    .sort((a, b) => b.valueOf() - a.valueOf()) // sort calories
    .slice(0, numberOfElves) // consider only numberOfElves highest values
    .reduce(
      (accumulator, currentValue) =>
        accumulator.valueOf() + currentValue.valueOf(),
      0
    ); // sum values
};
