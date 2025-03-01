import React, { useState } from 'react';
import './App.css';

const App = () => {
  const size = 5; // 5x5 grid
  // Define the fixed pattern where each tile is either pink or blue (but not shown initially)
  const initialBoard = [
    ['blue', 'blue', 'blue', 'pink', 'pink'],
    ['pink', 'pink', 'blue', 'pink', 'pink'],
    ['blue', 'pink', 'pink', 'pink', 'pink'],
    ['blue', 'blue', 'blue', 'blue', 'blue'],
    ['pink', 'pink', 'blue', 'pink', 'pink']
  ];

  // Initial empty board with null values, tiles will be revealed when clicked
  const [board, setBoard] = useState(Array(size).fill(null).map(() => Array(size).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('pink');
  const [gameOver, setGameOver] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState('');

  // Function to handle tile click
  const handleClick = (row, col) => {
    if (board[row][col] || gameOver) return;

    // Set the clicked tile color based on the predefined pattern in initialBoard
    const color = initialBoard[row][col];
    const newBoard = board.map((r, rIdx) =>
        rIdx === row
            ? r.map((cell, cIdx) => (cIdx === col ? color : cell))
            : r
    );

    setBoard(newBoard);
    checkForWinner(newBoard, row, col);
    setCurrentPlayer(currentPlayer === 'pink' ? 'blue' : 'pink');
  };

  // Check if there are 5 consecutive tiles in a row, column, or diagonal
  const checkForWinner = (board, row, col) => {
    const directions = [
      { r: 0, c: 1 }, // horizontal
      { r: 1, c: 0 }, // vertical
      { r: 1, c: 1 }, // diagonal down-right
      { r: 1, c: -1 }, // diagonal down-left
    ];

    for (let { r, c } of directions) {
      let count = 1;

      // Check in both positive and negative directions
      for (let i = 1; i < 5; i++) {
        const newRow = row + r * i;
        const newCol = col + c * i;
        if (newRow < 0 || newRow >= size || newCol < 0 || newCol >= size || board[newRow][newCol] !== board[row][col]) break;
        count++;
      }

      for (let i = 1; i < 5; i++) {
        const newRow = row - r * i;
        const newCol = col - c * i;
        if (newRow < 0 || newRow >= size || newCol < 0 || newCol >= size || board[newRow][newCol] !== board[row][col]) break;
        count++;
      }

      if (count >= 5) {
        setGameOver(true);
        setWinnerMessage(board[row][col] === 'pink' ? "It's a Girl! 💖" : "It's a Boy! 💙");
        return;
      }
    }
  };

  // Rendering the 5x5 grid
  return (
      <div className="board">
        {board.map((row, rowIdx) => (
            <div key={rowIdx} className="row">
              {row.map((cell, colIdx) => (
                  <div
                      key={colIdx}
                      className="tile"
                      onClick={() => handleClick(rowIdx, colIdx)}
                  >
                    {cell === 'pink' ? '🎀' : cell === 'blue' ? '🔵' : ''}
                  </div>
              ))}
            </div>
        ))}
        {gameOver && <div className="winner-message">{winnerMessage}</div>}
      </div>
  );
};

export default App;
