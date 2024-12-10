import { useSettings } from '../../provider/SettingsProvider';
import { Cell } from '../Cell/Cell';
import { Commands } from '../Commands/Commands';
import './Grid.css';
import { useEffect, useState } from 'react';

export const Grid = () => {
    const { numCols, numRows, settingWalls } = useSettings();

    const emptyCell = 'O';
    const wallCell = 'wall';

    const [ grid, setGrid ] = useState([ ...Array(numCols) ].map(() => [ ...Array(numRows) ].map(() => emptyCell)));
    const [ roombaPosition, setRoombaPosition ] = useState({ x: 0, y: 0 });
    const [ roombaDirection, setRoombaDirection ] = useState('N');

    useEffect(() => {
        if (numCols === 0 || numRows === 0) return;
        
        let newGrid = [ ...grid ];

        if (numCols > newGrid.length) {
            for (let i = newGrid.length; i < numCols; i++) {
                newGrid.push([ ...Array(numRows) ]);
            }
        }

        if (numCols < newGrid.length) {
            for (let i = newGrid.length; i > numCols; i--) {
                newGrid.pop();
            }
        }

        if (numRows > newGrid[0].length) {
            for (let i = 0; i < newGrid.length; i++) {
                for (let j = newGrid[i].length; j < numRows; j++) {
                    newGrid[i].push(undefined);
                }
            }
        }

        if (numRows < newGrid[0].length) {
            for (let i = 0; i < newGrid.length; i++) {
                for (let j = newGrid[i].length; j > numRows; j--) {
                    newGrid[i].pop();
                }
            }
        }

        if (newGrid[roombaPosition.x] === undefined || newGrid[roombaPosition.x][roombaPosition.y] === undefined) {
            setRoombaPosition({ x: 0, y: 0 });
        }

        setGrid(newGrid);
        }, [numCols, numRows]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [roombaPosition, roombaDirection]);

    const commands = [
        {
            text: 'Move Forward',
            onClick: handleMove
        },
        {
            text: 'Turn Right',
            onClick: () => handleRotate('R')
        },
        {
            text: 'Turn Left',
            onClick: () => handleRotate('L')
        }
    ]

    function handleRotate (direction = 'R') {
        switch (roombaDirection) {
            case 'N':
                if (direction == 'L') setRoombaDirection('W');
                if (direction == 'R') setRoombaDirection('E');
                break;
            case 'E':
                if (direction == 'L') setRoombaDirection('N');
                if (direction == 'R') setRoombaDirection('S');
            break;
            case 'S':
                if (direction == 'L') setRoombaDirection('E');
                if (direction == 'R') setRoombaDirection('W');
                break;
            case 'W':
                if (direction == 'L') setRoombaDirection('S');
                if (direction == 'R') setRoombaDirection('N');
                break;
        }
    }

    function handleMove () {

        let newPosition = { x: roombaPosition.x, y: roombaPosition.y };

        switch (roombaDirection) {
            case 'N':
                newPosition = { x: roombaPosition.x, y: roombaPosition.y - 1 };
                break;
            case 'E':
                newPosition = { x: roombaPosition.x + 1 , y: roombaPosition.y };
                break;
            case 'S':
                newPosition = { x: roombaPosition.x, y: roombaPosition.y + 1 };
                break;
            case 'W':
                newPosition = { x: roombaPosition.x - 1, y: roombaPosition.y };
                break;
        }

        const isOffLimits = (
            grid[newPosition.y] === undefined ||
            newPosition.x < 0 || 
            newPosition.x >= grid.length  || 
            newPosition.y < 0 || 
            newPosition.y >= grid[newPosition.y].length  ||
            grid[newPosition.x][newPosition.y] === wallCell
        )

        if (isOffLimits) return handleRotate('R'); 
        else setRoombaPosition(newPosition);
    }

    function handleCellOnClick (x, y) {
        if (!settingWalls) return 

        let newGrid = [ ...grid ];
        grid[x][y] === wallCell ? newGrid[x][y] = undefined : newGrid[x][y] = wallCell;
        setGrid(newGrid);
    }

    function handleKeyDown (e) {
        if (e.key === 'ArrowUp') handleMove();
        if (e.key === 'ArrowRight') handleRotate('R');
        if (e.key === 'ArrowLeft') handleRotate('L');
    }

    return (
        <>
            <Commands commands={commands} />
            <div className="Grid">
                {
                    grid.map((col, colIndex) => {
                        return (
                            <div className="Column" key={colIndex}>
                                {
                                    col.map((cell, rowIndex) => {
                                        let hasRoomba = roombaPosition.x === colIndex && roombaPosition.y === rowIndex;
                                        let isWall = grid[colIndex][rowIndex] === wallCell;
                                        return (
                                            <Cell key={rowIndex} hasRoomba={hasRoomba} roombaDirection={roombaDirection} isWall={isWall} onClick={()=> handleCellOnClick(colIndex, rowIndex)}/>
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