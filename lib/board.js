'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfEmptySpaces = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'hasNonBombEmptySpaces',
    value: function hasNonBombEmptySpaces() {
      return this._numberOfBombs !== this._numberOfEmptySpaces;
    }
  }, {
    key: 'getNumberOfSurroundingBombs',
    value: function getNumberOfSurroundingBombs(flipRow, flipColumn) {
      var _this = this;

      var offsets = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];

      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;

      var numberOfSurroundingBombs = 0;
      offsets.forEach(function (offSet) {
        var neighborRowIndex = flipRow + offSet[0];
        var neighborColumnIndex = flipColumn + offSet[1];

        // Check to see if row and column are valid tile values on the board
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfSurroundingBombs++;
          }
        }
      });

      return numberOfSurroundingBombs;
    }
  }, {
    key: 'flipTile',
    value: function flipTile(flipRow, flipColumn) {
      // Check if tile is already flipped, if so, return
      if (this._playerBoard[flipRow][flipColumn] !== ' ') {
        return;
      }

      this._numberOfEmptySpaces--;

      // Check if tile is bomb, if so, place bomb on player board
      if (this._bombBoard[flipRow][flipColumn] === 'B') {
        this._playerBoard[flipRow][flipColumn] = 'B';
      } else {
        this._playerBoard[flipRow][flipColumn] = this.getNumberOfSurroundingBombs(flipRow, flipColumn);
      }
      // if tile is not bomb, place number of surrounding bombs on player board
    }
  }, {
    key: 'print',
    value: function print() {
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
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
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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
    }
  }]);

  return Board;
}();