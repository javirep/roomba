import { useContext, createContext, useState} from "react";

export const SettingsProvider = (props) => {
    const {children} = props;
    const [numRows, setNumRows] = useState(10);
    const [numCols, setNumCols] = useState(10);
    const [settingWalls, setSettingWalls] = useState(false);
  
    const value = {
        numRows, 
        setNumRows,
        numCols,
        setNumCols,
        settingWalls,
        setSettingWalls
    };
    // @ts-ignore
    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
  };

  const SettingsContext = createContext({
    numRows: 10,
    setNumRows: () => {},
    numCols: 10,
    setNumCols: () => {},
    settingWalls: false,
    setSettingWalls: () => {}
  });
  
  export const useSettings = () => {
    return useContext(SettingsContext);
  };
  