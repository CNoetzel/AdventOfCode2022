import * as fs from 'fs';
import * as readline from 'readline';

enum Direction {
  UP = 'U',
  DOWN = 'D',
  LEFT = 'L',
  RIGHT = 'R',
}

class Position {
  x = 0;
  y = 0;

  public toString = (): string => {
    return `(${this.x}/${this.y})`;
  };

  moveInDirection = (direction: Direction) => {
    switch (direction) {
      case Direction.UP: {
        this.x += 1;
        break;
      }
      case Direction.DOWN: {
        this.x -= 1;
        break;
      }
      case Direction.LEFT: {
        this.y -= 1;
        break;
      }
      case Direction.RIGHT: {
        this.y += 1;
        break;
      }
    }
  };

  moveBasedOnPosition = (otherPos: Position) => {
    // no movement needed if positions overlay or are touching
    if (
      Math.abs(this.x - otherPos.x) <= 1 &&
      Math.abs(this.y - otherPos.y) <= 1
    ) {
      return;
    } else if (this.x < otherPos.x && this.y === otherPos.y) {
      this.x += 1; // up
    } else if (this.x > otherPos.x && this.y === otherPos.y) {
      this.x -= 1; // down
    } else if (this.y > otherPos.y && this.x === otherPos.x) {
      this.y -= 1; // left
    } else if (this.y < otherPos.y && this.x === otherPos.x) {
      this.y += 1; // right
    } else if (this.x - otherPos.x < 0 && this.y - otherPos.y < 0) {
      this.x += 1; // vertical up right
      this.y += 1;
    } else if (this.x - otherPos.x < 0 && this.y - otherPos.y > 0) {
      this.x += 1; // vertical up left
      this.y -= 1;
    } else if (this.x - otherPos.x > 0 && this.y - otherPos.y < 0) {
      this.x -= 1; // vertical down right
      this.y += 1;
    } else if (this.x - otherPos.x > 0 && this.y - otherPos.y > 0) {
      this.x -= 1; // vertical down left
      this.y -= 1;
    } else {
      console.error('This case should not occur!');
    }
  };
}

const file = (path: string) =>
  readline.createInterface({
    input: fs.createReadStream(path),
    output: process.stdout,
    terminal: false,
  });

const initRope = (length: number): Array<Position> => {
  const rope = new Array<Position>();
  for (let i = 0; i < length; i++) {
    rope.push(new Position());
  }
  return rope;
};

export const getNumberOfPositionsVisitedByTail = async (
  path: string,
  ropeLength: number
): Promise<number> =>
  new Promise<number>(res => {
    const visitedPositions = new Set<string>();
    const rope = initRope(ropeLength);
    visitedPositions.add(rope[rope.length - 1].toString());
    file(path)
      .on('line', line => {
        const [direction, steps] = line.split(' ');
        for (let i = 0; i < +steps; i++) {
          rope[0].moveInDirection(direction as Direction);
          for (let j = 1; j < rope.length; j++) {
            rope[j].moveBasedOnPosition(rope[j - 1]);
            if (j === rope.length - 1) {
              visitedPositions.add(rope[j].toString());
            }
          }
        }
      })
      .on('close', () => {
        res(visitedPositions.size);
      });
  });
