const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
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
}; // function that will generate a blank board of a given size to hold the player's guesses

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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
};

const getNumberOfSurroundingBombs = (bombBoard, flipRow, flipColumn) => {
  const offsets = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];

  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;

  let numberOfSurroundingBombs = 0;
  offsets.forEach(offSet => {
    const neighborRowIndex = flipRow + offSet[0];
    const neighborColumnIndex = flipColumn + offSet[1];

    // Check to see if row and column are valid tile values on the board
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        numberOfSurroundingBombs++;
      }
    }
  });

  return numberOfSurroundingBombs;
}

const flipTile = (playerBoard, bombBoard, flipRow, flipColumn) => {
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

const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
}; // format the game with printBoard

let playerBoard = generatePlayerBoard(5, 5);
let bombBoard = generateBombBoard(5, 5, 8);

printBoard(bombBoard);
console.log(getNumberOfSurroundingBombs(bombBoard, 0 , 0));

/*
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 1, 1);
console.log('Player Board: ');
printBoard(playerBoard);
*/
