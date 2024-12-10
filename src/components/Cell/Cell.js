import classNames from 'classnames';
import './Cell.css';

export const Cell = (prop) => {
    const { hasRoomba, roombaDirection } = prop;

    return (
        <div className="Cell">
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