import {create} from 'domain';
import * as fs from 'fs';
import * as readline from 'readline';

const stackLineRegex = /^\s\d.*$/g;
const removeRegex = /move|from|to/g;
const trimRegex = /\s\s+/g;

export const enum MoverType {
  CRATEMOVER_9000,
  CRATEMOVER_9001,
}

interface FileOutput {
  stacks: Array<Array<string>>;
  commands: Array<Array<number>>;
}

const file = (path: string) =>
  readline.createInterface({
    input: fs.createReadStream(path),
    output: process.stdout,
    terminal: false,
  });

export const readFile = async (path: string, stackSize: number) =>
  new Promise<FileOutput>(res => {
    const stacks = new Array<Array<string>>(stackSize);
    const commands = new Array<Array<number>>();
    let readStacks = true;
    file(path)
      .on('line', line => {
        if (line === '' || line.match(stackLineRegex)) {
          // skip if line is empty or it's the line with stack numbers
          readStacks = false;
        } else if (readStacks) {
          // build stack data by pushing crates to stacks
          const chars = line.split('');
          for (let i = 1; i < stackSize * 4; i += 4) {
            const stackNumber = Math.floor(i / 4);
            if (chars[i].trim() !== '') {
              const stack = stacks[stackNumber];
              stack
                ? stack.unshift(chars[i])
                : (stacks[stackNumber] = new Array(chars[i]));
            }
          }
        } else {
          // remove text and build command arrays
          const singleCmd = line
            .replace(removeRegex, '')
            .replace(trimRegex, ' ')
            .trim()
            .split(' ')
            .map(n => +n);
          commands.push(singleCmd);
        }
      })
      .on('close', () => {
        res({stacks, commands});
      });
  });

export const getRearangementOutput = async (
  path: string,
  stackSize: number,
  moverType: MoverType
): Promise<string> => {
  const {stacks, commands} = await readFile(path, stackSize);

  // execute commands by crate mover type
  commands.forEach(cmd => {
    switch (moverType) {
      case MoverType.CRATEMOVER_9000: {
        // in this case only one crate is moved at once,
        // so the command must be repeated several times
        for (let count = 0; count < cmd[0]; count++) {
          const crate = stacks[cmd[1] - 1].pop()!;
          stacks[cmd[2] - 1].push(crate);
        }
        break;
      }
      case MoverType.CRATEMOVER_9001: {
        // in this case multiple crates are moved at once,
        // so we pop() them before adding them to the target stack
        const crates = new Array<string>();
        for (let count = 0; count < cmd[0]; count++) {
          const crate = stacks[cmd[1] - 1].pop()!;
          crates.unshift(crate);
        }
        stacks[cmd[2] - 1] = stacks[cmd[2] - 1].concat(crates);
        break;
      }
      default: {
        console.error('Cratetype not supported');
        break;
      }
    }
  });

  // get crates on top and concatenate to output
  let output = '';
  stacks.forEach(s => (output += s.pop() || ''));

  return output;
};
