import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // 3x3 grid (9 cells)
  const [isXNext, setIsXNext] = useState(true); // Track whose turn (X or O)
  const [winner, setWinner] = useState(null); // Track the winner
  const [level, setLevel] = useState(1); // Track the current level
  const [xWins, setXWins] = useState(0); // Track X's wins
  const [oWins, setOWins] = useState(0); // Track O's wins
  const [gameOver, setGameOver] = useState(false); // Track if the game is over after 3 levels

  // Check for a winner
  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return 'X' or 'O' if there's a winner
      }
    }
    return null; // No winner yet
  };

  // Handle cell click
  const handleClick = (index) => {
    if (board[index] || winner || gameOver) return; // Do nothing if cell is filled or there's already a winner or the game is over

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const currentWinner = calculateWinner(newBoard);
    if (currentWinner) {
      setWinner(currentWinner);
      setTimeout(() => {
        // Move to next level after 2 seconds
        if (currentWinner === "X") {
          setXWins((prev) => prev + 1);
        } else {
          setOWins((prev) => prev + 1);
        }
        if (level < 3) {
          setLevel(level + 1); // Increment level
        } else {
          setGameOver(true); // End the game after level 3
        }
        setWinner(null); // Reset winner after each level
        setBoard(Array(9).fill(null)); // Reset the board
      }, 2000);
    }
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null)); // Reset the board
    setIsXNext(true); // X starts first
    setWinner(null); // No winner yet
    setLevel(1); // Reset to level 1
    setXWins(0); // Reset X wins
    setOWins(0); // Reset O wins
    setGameOver(false); // Reset game over state
  };

  // Render each cell in the grid
  const renderCell = (index) => {
    return (
      <button
        className={`cell ${board[index]}`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div className="game-container">
      <h1 className="title">Tic-Tac-Toe - Level {level}</h1>

      {/* Game Board */}
      <div className="board">{board.map((_, index) => renderCell(index))}</div>

      {/* Winner Message */}
      {winner ? (
        <div className="winner-message">
          <h2>{winner} wins!</h2>
        </div>
      ) : (
        <h2>{isXNext ? "X" : "O"}'s turn</h2>
      )}

      {/* Scoreboard */}
      {!gameOver && (
        <div className="scoreboard">
          <p>X Wins: {xWins}</p>
          <p>O Wins: {oWins}</p>
        </div>
      )}

      {/* Game Over Message */}
      {gameOver && (
        <div className="game-over-message">
          <h2>Game Over!</h2>
          <p>
            {xWins > oWins
              ? `X won with ${xWins}:${oWins}`
              : `O won with ${oWins}:${xWins}`}
          </p>
        </div>
      )}

      {/* Reset Button */}
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default App;
