import * as fs from 'fs';
import * as readline from 'readline';
import {File, Folder} from './types';

const moveToRootCmd = /^\$\scd\s\/$/g;
const moveToParentCmd = /^\$\scd\s\.\.$/g;
const moveToFolderCmd = /^\$\scd\s\w+$/g;
const listCmd = /^\$\sls$/g;
const folderRgx = /^dir\s\w+$/g;
const fileRgx = /^\d+\s\w+(\.\w+)?$/g;

const file = (path: string) =>
  readline.createInterface({
    input: fs.createReadStream(path),
    output: process.stdout,
    terminal: false,
  });

export const buildFolderStructure = async (path: string) =>
  new Promise<Folder>(res => {
    const root = new Folder('/', null);
    let currentDir = root;
    file(path)
      .on('line', line => {
        if (line.match(moveToRootCmd)) {
          currentDir = root;
        } else if (line.match(listCmd)) {
          // do nothing
        } else if (line.match(folderRgx)) {
          currentDir.subFolders.push(
            new Folder(line.split(' ')[1], currentDir)
          );
        } else if (line.match(fileRgx)) {
          const fileData = line.split(' ');
          currentDir.files.push(new File(fileData[1], +fileData[0]));
        } else if (line.match(moveToFolderCmd)) {
          currentDir = currentDir.subFolders.filter(
            f => f.name === line.split(' ')[2]
          )[0];
        } else if (line.match(moveToParentCmd)) {
          currentDir = currentDir.parent!;
        } else {
          console.error(`No match found for line '${line}'!`);
        }
      })
      .on('close', () => {
        res(root);
      });
  });

let sum = 0;
const sumRecursive = (folder: Folder, threshold: number) => {
  const size = folder.getSize();
  sum += size <= threshold ? size : 0;
  folder.subFolders.forEach(f => sumRecursive(f, threshold));
};

let folderWithSmallestSize: number | undefined = undefined;
const getSizeOfSmallestFolderAboveThreshold = (
  folder: Folder,
  threshold: number
) => {
  const size = folder.getSize();
  folderWithSmallestSize =
    folderWithSmallestSize === undefined ||
    (size >= threshold && size < folderWithSmallestSize)
      ? size
      : folderWithSmallestSize;
  folder.subFolders.forEach(f =>
    getSizeOfSmallestFolderAboveThreshold(f, threshold)
  );
};

export const sumFolderSizeForThreshold = async (
  path: string,
  threshold: number
): Promise<number> => {
  const folderStructure = await buildFolderStructure(path);
  sumRecursive(folderStructure, threshold);
  return sum;
};

export const sizeOfSmallestDirectoryToDelete = async (path: string) => {
  const totalSpace = 70000000;
  const minFreeSpace = 30000000;
  const folderStructure = await buildFolderStructure(path);
  const threshold = minFreeSpace - (totalSpace - folderStructure.getSize());
  getSizeOfSmallestFolderAboveThreshold(folderStructure, threshold);
  return folderWithSmallestSize;
};
