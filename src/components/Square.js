export default function Square({color, mass, onSquareClick}) {
    return <button className="square" style={{color: color}} onClick={onSquareClick}>{mass}</button>;
}