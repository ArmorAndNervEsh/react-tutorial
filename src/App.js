import React, {useState} from 'react';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove,setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove %2 === 0;

  const hundlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={hundlePlay}/>
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Board({xIsNext, squares, onPlay}) {

  const hundleClick = (i) => {
    if (squares[i] || culculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares)
  }

  const winner = culculateWinner(squares);
  let status;
  if(winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xIsNext? 'X' : 'O');
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square mass={squares[0]} onSquareClick={() => hundleClick(0)}/>
        <Square mass={squares[1]} onSquareClick={() => hundleClick(1)}/>
        <Square mass={squares[2]} onSquareClick={() => hundleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square mass={squares[3]} onSquareClick={() => hundleClick(3)}/>
        <Square mass={squares[4]} onSquareClick={() => hundleClick(4)}/>
        <Square mass={squares[5]} onSquareClick={() => hundleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square mass={squares[6]} onSquareClick={() => hundleClick(6)}/>
        <Square mass={squares[7]} onSquareClick={() => hundleClick(7)}/>
        <Square mass={squares[8]} onSquareClick={() => hundleClick(8)}/>
      </div>
    </>
  );
}

function Square({mass, onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>{mass}</button>;
}

function culculateWinner(squares: (string|null)[]): string|null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  };
  return null;
}