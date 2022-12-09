import * as fs from 'fs';
import * as readline from 'readline';

enum Direction {
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
}

const file = (path: string) =>
  readline.createInterface({
    input: fs.createReadStream(path),
    output: process.stdout,
    terminal: false,
  });

export const buildForest = async (path: string) =>
  new Promise<Array<Array<number>>>(res => {
    const forest = new Array<Array<number>>();
    file(path)
      .on('line', line => {
        forest.push(line.split('').map(t => +t));
      })
      .on('close', () => {
        res(forest);
      });
  });

const isTreeVisibleFrom = (
  direction: Direction,
  forest: Array<Array<number>>,
  row: number,
  col: number
): boolean => {
  const treeHeigth = forest[row][col];
  let highestVal = 0;
  switch (direction) {
    case Direction.TOP: {
      for (let i = row - 1; i >= 0; i--) {
        highestVal = Math.max(highestVal, forest[i][col]);
      }
      break;
    }
    case Direction.LEFT: {
      for (let i = col - 1; i >= 0; i--) {
        highestVal = Math.max(highestVal, forest[row][i]);
      }
      break;
    }
    case Direction.BOTTOM: {
      for (let i = row + 1; i < forest.length; i++) {
        highestVal = Math.max(highestVal, forest[i][col]);
      }
      break;
    }
    case Direction.RIGHT: {
      for (let i = col + 1; i < forest[0].length; i++) {
        highestVal = Math.max(highestVal, forest[row][i]);
      }
      break;
    }
  }
  return highestVal < treeHeigth;
};

const getScenicScoreTo = (
  direction: Direction,
  forest: Array<Array<number>>,
  row: number,
  col: number
): number => {
  const treeHeight = forest[row][col];
  let score = 0;
  switch (direction) {
    case Direction.TOP: {
      for (let i = row - 1; i >= 0; i--) {
        score++;
        if (treeHeight <= forest[i][col]) {
          break;
        }
      }
      break;
    }
    case Direction.LEFT: {
      for (let i = col - 1; i >= 0; i--) {
        score++;
        if (treeHeight <= forest[row][i]) {
          break;
        }
      }
      break;
    }
    case Direction.BOTTOM: {
      for (let i = row + 1; i < forest.length; i++) {
        score++;
        if (treeHeight <= forest[i][col]) {
          break;
        }
      }
      break;
    }
    case Direction.RIGHT: {
      for (let i = col + 1; i < forest[0].length; i++) {
        score++;
        if (treeHeight <= forest[row][i]) {
          break;
        }
      }
      break;
    }
  }
  return score;
};

const isTreeVisible = (
  forest: Array<Array<number>>,
  row: number,
  col: number
): boolean => {
  // based on the position of the tree to check it may be more performant
  // to begin the check on the edge nearest to the tree
  return (
    isTreeVisibleFrom(Direction.TOP, forest, row, col) ||
    isTreeVisibleFrom(Direction.BOTTOM, forest, row, col) ||
    isTreeVisibleFrom(Direction.LEFT, forest, row, col) ||
    isTreeVisibleFrom(Direction.RIGHT, forest, row, col)
  );
};

const getScenicScore = (
  forest: Array<Array<number>>,
  row: number,
  col: number
) => {
  return (
    getScenicScoreTo(Direction.TOP, forest, row, col) *
    getScenicScoreTo(Direction.BOTTOM, forest, row, col) *
    getScenicScoreTo(Direction.LEFT, forest, row, col) *
    getScenicScoreTo(Direction.RIGHT, forest, row, col)
  );
};

export const getNumberOfVisibleTrees = async (
  path: string
): Promise<number> => {
  const forest = await buildForest(path);

  let sum = 0;
  for (let row = 1; row < forest.length - 1; row++) {
    for (let col = 1; col < forest[row].length - 1; col++) {
      sum += isTreeVisible(forest, row, col) ? 1 : 0;
    }
  }
  const edgeTreeCount = forest.length * 2 + forest[0].length * 2 - 4;
  return sum + edgeTreeCount;
};

export const getHighestScenicScore = async (path: string): Promise<number> => {
  const forest = await buildForest(path);

  let highestScore = 0;
  for (let row = 1; row < forest.length - 1; row++) {
    for (let col = 1; col < forest[row].length - 1; col++) {
      highestScore = Math.max(highestScore, getScenicScore(forest, row, col));
    }
  }
  return highestScore;
};
