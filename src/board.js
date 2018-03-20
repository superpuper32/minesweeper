export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
      this._numberOfBombs = numberOfBombs;
      this._numberOfEmptySpaces = numberOfRows * numberOfColumns;
      this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
      this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  hasNonBombEmptySpaces() {
    return this._numberOfBombs !== this._numberOfEmptySpaces;
  }

  getNumberOfSurroundingBombs(flipRow, flipColumn) {
    const offsets = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];

    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;

    let numberOfSurroundingBombs = 0;
    offsets.forEach(offSet => {
      const neighborRowIndex = flipRow + offSet[0];
      const neighborColumnIndex = flipColumn + offSet[1];

      // Check to see if row and column are valid tile values on the board
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfSurroundingBombs++;
        }
      }
    });

    return numberOfSurroundingBombs;
  }

  flipTile(flipRow, flipColumn) {
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
  };

  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = []; // array represent the overall game board
    // for loop iterating through numberOfRows
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      let row = []; // empty row array represent a single row to be added to the game board
      // nested for loop iterating through numberOfColumns
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(' '); // add the correct number of empty spaces to each row
      }
      board.push(row); // add the  newly-created row into the board array
    }
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      let row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(null);
      }
      board.push(row);
    }
    let numberOfBombsPlaced = 0; // bomb counter
    while (numberOfBombsPlaced < numberOfBombs) {
      const randomRowIndex = Math.floor(Math.random() * numberOfRows); // generate a random row index
      const randomColumnIndex = Math.floor(Math.random() * numberOfColumns); // generate a random column index

      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }
    return board;
  }
}
