import React, { useState } from "react";
import "./App.css";

const TURNS = {
  X: "x",
  O: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;
  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null; //we don't have a winner
  };

  const restartGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) =>{
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) => {
    if (board[index] === null && !winner) {
      // Check if the square is already filled
      const newBoard = [...board]; // Create a new array with the current board state
      newBoard[index] = turn; // Update the selected square
      setBoard(newBoard); // Update the state

      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
      setTurn(newTurn);
      const newWinner = checkWinner(newBoard);
      if (newWinner) {
        setWinner(newWinner);
      } else if (checkEndGame(newBoard)) { 
        setWinner(false) // it's a tie
      }
    }
  };

  return (
    <main className="board">
      <h1>tic tac toe</h1>
      <button onClick={restartGame}>Restart Game</button>
      <section className="game">
        {board.map((square, index) => (
          <Square
            key={index}
            index={index}
            isSelected={square === turn}
            updateBoard={updateBoard}
          >
            {square}
          </Square>
        ))}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>
              {winner === false ? "It's a tie!" : "The winner is " + winner}
            </h2>

            <header className="win">
                {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={restartGame}>Restart Game</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
