import {getCalories} from './day1/day1';
import {getScore, Strategy} from './day2/day2';

// Day1
const inputPathDayOne = 'challenges/day1/input/challenge.txt';
getCalories(inputPathDayOne, 1).then(highestCalories =>
  console.log(`Day 1 Part 1 - Highest calories: ${highestCalories}`)
);
getCalories(inputPathDayOne, 3).then(highestCaloriesTopThree =>
  console.log(`Day 1 Part 2 - Highest calories (top three): ${highestCaloriesTopThree}`)
);

// Day 2
const inputPathDayTwo = 'challenges/day2/input/challenge.txt';
getScore(inputPathDayTwo, Strategy.PartOne).then(score =>
  console.log(`Day 2 Part 1 - Score thinking X,Y,Z is rock, paper, sciccsors: ${score}`)
);
inputPathDayTwo;
getScore(inputPathDayTwo, Strategy.PartTwo).then(score =>
  console.log(`Day 2 Part 2 - Score knowing X,Y,Z is loose, draw, win: ${score}`)
);
