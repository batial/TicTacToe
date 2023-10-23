import { useState } from "react";
import confetti from "canvas-confetti";

import "./App.css";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkWinner, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ? turnFromStorage : TURNS.X;
  });
  const [winner, setWinner] = useState(null);

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  const updateBoard = (index) => {
    if (board[index] === null && !winner) {
      // Check if the square is already filled
      const newBoard = [...board]; // Create a new array with the current board state
      newBoard[index] = turn; // Update the selected square
      setBoard(newBoard); // Update the state

      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
      setTurn(newTurn);
      //save the board state
      window.localStorage.setItem("board", JSON.stringify(newBoard));
      window.localStorage.setItem("turn", newTurn);

      //check if we have a winner
      const newWinner = checkWinner(newBoard);
      if (newWinner) {
        confetti();
        setWinner(newWinner);
      } else if (checkEndGame(newBoard)) {
        setWinner(false); // it's a tie
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
      <WinnerModal restartGame={restartGame} winner={winner} />
    </main>
  );
}

export default App;
