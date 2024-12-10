import { useSettings } from '../../provider/SettingsProvider';
import './Settings.css';
export function Settings() {
    const { numCols, setNumCols, numRows, setNumRows, settingWalls, setSettingWalls } = useSettings();

    const handleSetting = (type, e) => {
        if (e.target.value <= 0 || e.target.value > 15) return;
        if (type === 'cols') setNumCols(Number(e.target.value));
        if (type === 'rows') setNumRows(Number(e.target.value));
    }

    return (
        <div className='settings-container'>
            <div>
                <label>Number of Columns: </label>
                <input type='number' value={numCols} onChange={(e) => handleSetting('cols', e )} />
            </div>
            <div>
                <label>Number of Rows: </label>
                <input type='number' value={numRows} onChange={(e) => handleSetting('rows', e)} />
            </div>

            <button onClick={()=> setSettingWalls(!settingWalls)}>{!settingWalls ? 'Set cells as walls' : 'Done setting walls'}</button>
        </div>
    );
}