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

    board[randomRowIndex][randomColumnIndex] = 'B'; // place the bomb

    numberOfBombsPlaced++; // increment
  } // potential to place bombs on top of already existing bombs
  return board;
}; // dinamically generating a Bomb Board

var printBoard = function printBoard(board) {
  console.log(board.map(function (row) {
    return row.join(' | ');
  }).join('\n'));
}; // format the game with printBoard

var playerBoard = generatePlayerBoard(3, 4);
var bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);