// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`
import { Board } from './board';
class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfColumns);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);

    // If there is a bomb at the flipped location, tell player they lost
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Game over! Here was the final board: ');
      this._board.print();
    }
    // if there is not a bomb at the flipped location, and game is over, tell player they won
    else if (this._board.hasNonBombEmptySpaces()) {
      console.log('Current Board: ');
      this._board.print();
    } else {
      console.log('Congratulation on winning! Here was your winning board: ');
      this._board.print();
    } // if there is not a bomb at the flipped location, and game is over, tell player current board
  }
}
