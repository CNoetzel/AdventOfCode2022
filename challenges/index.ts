import {getCalories} from './day1/day1';
import {getScore, Strategy} from './day2/day2';
import {getPrioritySum, getPrioritySumOfGroups} from './day3/day3';
import {countContainments, ContainmentType} from './day4/day4';
import {getRearangementOutput, MoverType} from './day5/day5';
import {getNumberOfCharactersToFirstMarker} from './day6/day6';
import {
  sizeOfSmallestDirectoryToDelete,
  sumFolderSizeForThreshold,
} from './day7/day7';
import {getHighestScenicScore, getNumberOfVisibleTrees} from './day8/day8';
import {getNumberOfPositionsVisitedByTail} from './day9/day9';

// Day1
const inputPathDayOne = 'challenges/day1/input/challenge.txt';
void getCalories(inputPathDayOne, 1).then(highestCalories =>
  console.log(`Day 1 Part 1 - Highest calories: ${highestCalories}`),
);
void getCalories(inputPathDayOne, 3).then(highestCaloriesTopThree =>
  console.log(
    `Day 1 Part 2 - Highest calories (top three): ${highestCaloriesTopThree}`,
  ),
);

// Day 2
const inputPathDayTwo = 'challenges/day2/input/challenge.txt';
void getScore(inputPathDayTwo, Strategy.PART_ONE).then(score =>
  console.log(
    `Day 2 Part 1 - Score thinking X,Y,Z is rock, paper, sciccsors: ${score}`,
  ),
);
void getScore(inputPathDayTwo, Strategy.PART_TWO).then(score =>
  console.log(
    `Day 2 Part 2 - Score knowing X,Y,Z is loose, draw, win: ${score}`,
  ),
);

// Day 3
const inputPathDayThree = 'challenges/day3/input/challenge.txt';
void getPrioritySum(inputPathDayThree).then(sum =>
  console.log(`Day 3 Part 1 - Summed up priority of rucksack item: ${sum}`),
);
void getPrioritySumOfGroups(inputPathDayThree).then(sum =>
  console.log(`Day 3 Part 2 - Summed up priority of group items: ${sum}`),
);

// Day 4
const inputPathDayFour = 'challenges/day4/input/challenge.txt';
void countContainments(inputPathDayFour, ContainmentType.FULL).then(count =>
  console.log(`Day 4 Part 1 - Number of full containments: ${count}`),
);
void countContainments(inputPathDayFour, ContainmentType.PARTIAL).then(count =>
  console.log(`Day 4 Part 2 - Number of partial containments: ${count}`),
);

// Day 5
const inputPathDayFive = 'challenges/day5/input/challenge.txt';
void getRearangementOutput(inputPathDayFive, 9, MoverType.CRATEMOVER_9000).then(
  out => console.log(`Day 5 Part 1 - CrateMover 9000 output: ${out}`),
);
void getRearangementOutput(inputPathDayFive, 9, MoverType.CRATEMOVER_9001).then(
  out => console.log(`Day 5 Part 2 - CrateMover 9001 output: ${out}`),
);

// Day 6
const inputPathDaySix = 'challenges/day6/input/challenge.txt';
void getNumberOfCharactersToFirstMarker(inputPathDaySix, 4).then(number =>
  console.log(
    `Day 6 Part 1 - Number of chars to first packet marker: ${number}`,
  ),
);
void getNumberOfCharactersToFirstMarker(inputPathDaySix, 14).then(number =>
  console.log(
    `Day 6 Part 2 - Number of chars to first message marker: ${number}`,
  ),
);

// Day 7
const inputPathDaySeven = 'challenges/day7/input/challenge.txt';
void sumFolderSizeForThreshold(inputPathDaySeven, 100000).then(sum =>
  console.log(`Day 7 Part 1 - Sum of folders with size <= 100000: ${sum}`),
);
void sizeOfSmallestDirectoryToDelete(inputPathDaySeven).then(size =>
  console.log(`Day 7 Part 2 - Size of folder to delete: ${size}`),
);

// Day 8
const inputPathDayEight = 'challenges/day8/input/challenge.txt';
void getNumberOfVisibleTrees(inputPathDayEight).then(count =>
  console.log(`Day 8 Part 1 - Number of visible trees: ${count}`),
);
void getHighestScenicScore(inputPathDayEight).then(score =>
  console.log(`Day 8 Part 2 - Highest scenic score is: ${score}`),
);

// Day 9
const inputPathDayNine = 'challenges/day9/input/challenge.txt';
void getNumberOfPositionsVisitedByTail(inputPathDayNine, 2).then(count =>
  console.log(
    `Day 9 Part 1 - Number positions visited at least once: ${count}`,
  ),
);
void getNumberOfPositionsVisitedByTail(inputPathDayNine, 10).then(count =>
  console.log(
    `Day 9 Part 2 - Number positions visited at least once: ${count}`,
  ),
);
