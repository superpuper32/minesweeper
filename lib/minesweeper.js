'use strict';

var exampleBoard = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]; // create a structure of a game board

var printBoard = function printBoard(board) {
  console.log('Current Board:');
  console.log(board[0].join(' | '));
  console.log(board[1].join(' | '));
  console.log(board[2].join(' | '));
}; // format the game with printBoard

printBoard(exampleBoard); // function that format the game board
exampleBoard[0][1] = '1';
exampleBoard[2][2] = 'B';
printBoard(exampleBoard);