import { WINNER_COMBOS } from "../constants";

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

const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null);
};

export { checkWinner , checkEndGame };
