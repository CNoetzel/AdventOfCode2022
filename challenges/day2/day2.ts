import * as fs from 'fs';
import * as readline from 'readline';

export enum Strategy {
  PART_ONE,
  PART_TWO,
}

// Win = 6, Draw = 3, Lost = 0
// Rock (X,A) = 1, Paper (Y,B) = 2, Scissors (Z,C) = 3
const scoreMapOne = new Map<string, number>([
  ['A X', 4],
  ['A Y', 8],
  ['A Z', 3],
  ['B X', 1],
  ['B Y', 5],
  ['B Z', 9],
  ['C X', 7],
  ['C Y', 2],
  ['C Z', 6],
]);

// Win (Z) = 6, Draw (Y) = 3, Lost (X) = 0
// Rock (?,A) = 1, Paper (?,B) = 2, Scissors (?,C) = 3
const scoreMapTwo = new Map<string, number>([
  ['A X', 3], // Scissors
  ['A Y', 4], // Rock
  ['A Z', 8], // Paper
  ['B X', 1], // Rock
  ['B Y', 5], // Paper
  ['B Z', 9], // Scissors
  ['C X', 2], // Paper
  ['C Y', 6], // Scissors
  ['C Z', 7], // Rock
]);

const file = (path: string) =>
  readline.createInterface({
    input: fs.createReadStream(path),
    output: process.stdout,
    terminal: false,
  });

// read file and sum up score based on score map
// calcuate score thinking X,Y,Z meaning rock, paper, sciccsors --> ScoreMap.PartOne
// calcuate score knowing X,Y,Z meaning loose, draw, win --> ScoreMap.PartTwo
export const getScore = async (path: string, strategy: Strategy) =>
  new Promise<number>(res => {
    const scoreMap = strategy === Strategy.PART_ONE ? scoreMapOne : scoreMapTwo;
    let score = 0;
    file(path)
      .on('line', line => {
        score += scoreMap.get(line) || 0;
      })
      .on('close', () => {
        res(score);
      });
  });
