const blankLine = '   |   |   '; // represents one row with three columns

console.log(`This is what an empty board would look like:`);
console.log(blankLine);
console.log(blankLine);
console.log(blankLine);

// manually create a simulated game board
const guessLine = ' 1 |   |   '; // will look when a player click the 1st square
const bombLine = '   | B |   '; // reveals a bomb

// print the simulated game board
console.log(`This is what a board with a guess and a bomb on it would look like:`);
console.log(guessLine);
console.log(bombLine);
console.log(blankLine);
