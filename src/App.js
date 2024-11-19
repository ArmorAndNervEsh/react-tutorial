import React, {useState} from 'react';
// import "@babel/plugin-proposal-private-property-in-object"

import ToggleButton from './components/ToggleButton';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove,setCurrentMove] = useState(0);
  const [isAsc, setIsAsc] = useState(true)
  const currentSquares = history[currentMove];
  const xIsNext = currentMove %2 === 0;

  const hundlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const hundleToggleSort = () => {
    if(isAsc) {
			setIsAsc(false)
		}else{
			setIsAsc(true)
		}
  }

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move < 9) {
      if (move > 0) {
        if (move === history.length - 1) {
          description = 'You are at move #' + move;
          return (
            <li key={move}>
              <p>{description}</p>
            </li>
          )
        } else {
          description = 'Go to move #' + move;
        }
      } else {
        description = 'Go to game start';
      }
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      )
    }
  }).sort((a, b) => {
    if (isAsc) {
      return parseInt(a.key) - parseInt(b.key)
    } else {
      return parseInt(b.key) - parseInt(a.key)
    }
  })

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={hundlePlay}/>
      </div>
      <div className='game-info'>
        <ToggleButton className='toggle-sort' handleChange={hundleToggleSort} />
        <ol style={{listStyle:'none'}}>{moves}</ol>
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
    let filled = 0
    squares.forEach(element => {
      filled += element? 1 : 0
    })
    if (filled < 9) {
      status = "Next Player: " + (xIsNext? 'X' : 'O');
    } else {
      status = "Draw";
    }
  }

  return (
    <>
      <div className='status'>{status}</div>
      { (function() {
        const board = [];
        for (let i = 0; i < 3; i++) {
          const boardRow = [];
          for (let j = 0; j < 3; j++) {
            boardRow.push(<Square key={j} mass={squares[i*3+j]} onSquareClick={() => hundleClick(i*3+j)}/>);
          };
          board.push(<div key={i} className='board-row'>{boardRow}</div>);
        };
        return board
      }())}
    </>
  );
}

function Square({mass, onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>{mass}</button>;
}

function culculateWinner(squares) {
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