'use strict';

var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
  var board = []; // array represent the overall game board
  // for loop iterating through numberOfRows
  for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    var row = []; // empty row array represent a single row to be added to the game board
    // nested for loop iterating through numberOfColumns
    for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      row.push(' '); // add the correct number of empty spaces to each row
    }
    board.push(row); // add the  newly-created row into the board array
  }
  return board;
}; // function that will generate a blank board of a given size to hold the player's guesses

var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
  var board = [];
  for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    var row = [];
    for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      row.push(null);
    }
    board.push(row);
  }
  var numberOfBombsPlaced = 0; // bomb counter
  while (numberOfBombsPlaced < numberOfBombs) {
    var randomRowIndex = Math.floor(Math.random() * numberOfRows); // generate a random row index
    var randomColumnIndex = Math.floor(Math.random() * numberOfColumns); // generate a random column index

    if (board[randomRowIndex][randomColumnIndex] !== 'B') {
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
    }
  }
  return board;
};

var getNumberOfSurroundingBombs = function getNumberOfSurroundingBombs(bombBoard, flipRow, flipColumn) {
  var offsets = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];

  var numberOfRows = bombBoard.length;
  var numberOfColumns = bombBoard[0].length;

  var numberOfSurroundingBombs = 0;
  offsets.forEach(function (offSet) {
    var neighborRowIndex = flipRow + offSet[0];
    var neighborColumnIndex = flipColumn + offSet[1];

    // Check to see if row and column are valid tile values on the board
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        numberOfSurroundingBombs++;
      }
    }
  });

  return numberOfSurroundingBombs;
};

var flipTile = function flipTile(playerBoard, bombBoard, flipRow, flipColumn) {
  // Check if tile is already flipped, if so, return
  if (playerBoard[flipRow][flipColumn] !== ' ') {
    return;
  }

  // Check if tile is bomb, if so, place bomb on player board
  if (bombBoard[flipRow][flipColumn] === 'B') {
    playerBoard[flipRow][flipColumn] = 'B';
  } else {
    playerBoard[flipRow][flipColumn] = getNumberOfSurroundingBombs(bombBoard, flipRow, flipColumn);
  }
  // if tile is not bomb, place number of surrounding bombs on player board
};

var printBoard = function printBoard(board) {
  console.log(board.map(function (row) {
    return row.join(' | ');
  }).join('\n'));
}; // format the game with printBoard

var playerBoard = generatePlayerBoard(5, 5);
var bombBoard = generateBombBoard(5, 5, 8);

printBoard(bombBoard);
console.log(getNumberOfSurroundingBombs(bombBoard, 0, 0));

/*
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 1, 1);
console.log('Player Board: ');
printBoard(playerBoard);
*/