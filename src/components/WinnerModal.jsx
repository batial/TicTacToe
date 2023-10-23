import { Square } from "./Square";

function WinnerModal({ winner, restartGame }) {
  if (winner === null) return null;
  const winnerText = winner === false ? "It's a tie!" : "The winner is";
  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>

        {
          //If we don't have a winner, this icon doesn't show.
          winner && (
            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>
          )
        }

        <footer>
          <button onClick={restartGame}>Restart Game</button>
        </footer>
      </div>
    </section>
  );
}

export { WinnerModal };
