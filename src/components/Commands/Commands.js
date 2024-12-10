import './Commands.css';

export const Commands = (props) => {
    const { commands } = props;

    function getCommands() {
        return commands.map((command, index) => {
            return <button className='command-button' key={index} onClick={command.onClick}>{command.text}</button>
        });
    }
    return (
        <div className="commands-container">
            {getCommands()}
        </div>
    );
}