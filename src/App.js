import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = `${winner} Winner`;
  } else {
    status = `Next Player Move ${xIsNext ? "X" : "O"}`;
  }

  function onSquareClick(i) {
    if (square[i] || calculateWinner(square)) {
      return;
    }
    const nextSquares = square.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquare(nextSquares);
    setXIsNext(!xIsNext);
  }
  function resetGame() {
    setSquare(Array(9).fill(null)); setXIsNext(true);
  }
  return (
    <>
      <div className="container">
        <div className={winner?'text-success status':"status"}>{status}</div>
        <div className="board-row">
          <Square value={square[0]} onSquareClick={() => onSquareClick(0)} />
          <Square value={square[1]} onSquareClick={() => onSquareClick(1)} />
          <Square value={square[2]} onSquareClick={() => onSquareClick(2)} />
        </div>
        <div className="board-row">
          <Square value={square[3]} onSquareClick={() => onSquareClick(3)} />
          <Square value={square[4]} onSquareClick={() => onSquareClick(4)} />
          <Square value={square[5]} onSquareClick={() => onSquareClick(5)} />
        </div>
        <div className="board-row">
          <Square value={square[6]} onSquareClick={() => onSquareClick(6)} />
          <Square value={square[7]} onSquareClick={() => onSquareClick(7)} />
          <Square value={square[8]} onSquareClick={() => onSquareClick(8)} />
        </div>
        <button type="button" className="btn btn-success btn-sm my-5" onClick={()=>resetGame()}>Reset</button>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
