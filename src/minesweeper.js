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

    board[randomRowIndex][randomColumnIndex] = 'B'; // place the bomb

    numberOfBombsPlaced++; // increment
  } // potential to place bombs on top of already existing bombs
  return board;
}; // dinamically generating a Bomb Board

const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
}; // format the game with printBoard

let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
