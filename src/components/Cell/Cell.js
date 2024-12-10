import classNames from 'classnames';
import './Cell.css';

export const Cell = (prop) => {
    const { hasRoomba, roombaDirection, isWall, onClick } = prop;

    return (
        <div className={classNames("Cell", {'wall' : isWall})} onClick={onClick}>
            {
                hasRoomba && <div className={classNames("Roomba", {
                    'North': roombaDirection === 'N',
                    'South': roombaDirection === 'S',
                    'East': roombaDirection === 'E',
                    'West': roombaDirection === 'W'
                })}>☝🏼</div>
            }
        </div>
    );
}