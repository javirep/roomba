import { Cell } from '../Cell/Cell';
import './grid.css';
import { useState } from 'react';

export const Grid = () => {

    const [numRows, setNumRows] = useState(10);
    const [numCols, setNumCols] = useState(10);
    const [roombaPosition, setRoombaPosition] = useState({ x: 0, y: 0 });
    const [roombaDirection, setRoombaDirection] = useState('N');

    const handleRotate = () => {
        switch (roombaDirection) {
            case 'N':
                setRoombaDirection('E');
                break;
            case 'E':
                setRoombaDirection('S');
                break;
            case 'S':
                setRoombaDirection('W');
                break;
            case 'W':
                setRoombaDirection('N');
                break;
        }
    }

    const handleMove = () => {
        switch (roombaDirection) {
            case 'N':
                if (roombaPosition.y !== 0 ) setRoombaPosition({ x: roombaPosition.x, y: roombaPosition.y - 1 });
                else handleRotate();
                break;
            case 'E':
                if(roombaPosition.x !== numCols - 1 ) setRoombaPosition({ x: roombaPosition.x + 1 , y: roombaPosition.y });
                else handleRotate();
                break;
            case 'S':
                if(roombaPosition.y !== numRows - 1 ) setRoombaPosition({ x: roombaPosition.x, y: roombaPosition.y + 1 });
                else handleRotate();
                break;
            case 'W':
                if(roombaPosition.x !== 0 ) setRoombaPosition({ x: roombaPosition.x - 1, y: roombaPosition.y });
                else handleRotate();
                break;
        }
    }

    const rows = [];
    const cols = [];

    for (let i = 0; i < numRows; i++) {
        rows.push(i);
    }
    for (let i = 0; i < numCols; i++) {
        cols.push(i);
    }

    return (
        <>
        <div className="button-container">
            <button className="button" onClick={()=> handleMove()}>Move Forward</button>
            <button className="button" onClick={()=> handleRotate()}>Turn Right</button>
        </div>
        <div className="Grid">
            {
                cols.map((col, rowIndex) => {
                    return (
                        <div className="Column" key={rowIndex}>
                            {
                                rows.map((row, colIndex) => {
                                    let hasRoomba = roombaPosition.x === rowIndex && roombaPosition.y === colIndex;
                                    return (
                                        <Cell key={colIndex} hasRoomba={hasRoomba} roombaDirection={roombaDirection} />
                                    );
                                })
                            }
                        </div>
                    );
                })
            }
        </div>
        </>
    );
}