import Square from "./Square"

export default function Board({xIsNext, squares, onPlay}) {

    const hundleClick = (i) => {  
        const [winner, line] = culculateWinner(squares);
        if (squares[i] || winner) {
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

    const [winner, line] = culculateWinner(squares);
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
    
    const board = [];
    for (let i = 0; i < 3; i++) {
        const boardRow = [];
        for (let j = 0; j < 3; j++) {
            let color = (line && line.includes(i*3+j)) ? '#ff0000' : '#000000';
            boardRow.push(<Square color={color} key={j} mass={squares[i*3+j]} onSquareClick={() => hundleClick(i*3+j)}/>)
        };
        board.push(<div key={i} className='board-row'>{boardRow}</div>);
    };
    return (
        <>
            <div className='status'>{status}</div>
            {board}
        </>           
    );
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
        return [squares[a], [a,b,c]]
        }
    };
    return [null, []];
}