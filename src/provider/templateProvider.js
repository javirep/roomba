import { useContext, createContext, useState} from "react";

export const TemplateProvider = (props) => {
    const {children} = props;
    const [template, setTemplate] = useState();
  
    const value = {
        template, 
        setTemplate
    };
    // @ts-ignore
    return <PatientsContext.Provider value={value}>{children}</PatientsContext.Provider>;
  };

  const TemplateContext = createContext({
    template, 
    setTemplate
  });
  
  export const useTemplate = () => {
    return useContext(TemplateContext);
  };
  