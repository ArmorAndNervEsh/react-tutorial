import React, {useState} from "react";

import Board from "./Board" 
import ToggleButton from './ToggleButton';

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove ,setCurrentMove] = useState(0);
  
    const hundlePlay = (nextSquares) => {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    }
  
    const [isAsc, setIsAsc] = useState(true)
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
      
      if (move < 10) {
        if (move > 0) {
          let diff = 0;
          (history[move]).forEach((value, index) => {
            if (history[move][index] !== history[move-1][index]){
              diff = index
            }
          })
          if (move === history.length-1) {
            description = 'You are at move #' + move
          } else {
            description = 'Go to move #' + move + `(${parseInt(diff/3) + 1}, ${diff%3 + 1})`;
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

    const currentSquares = history[currentMove];
    const xIsNext = currentMove %2 === 0;
  
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