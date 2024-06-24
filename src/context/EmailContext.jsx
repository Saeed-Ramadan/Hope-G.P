
import { createContext, useContext, useEffect, useState } from "react";



const EmailContext = createContext({});

const EmailProvider = ({ children }) => {
  
  const [Nav, setNav] = useState(false);
 
 const  handlNav=()=>{
  setNav(true)
 }
  return (
    <EmailContext.Provider  value={{handlNav,Nav}}>
      {children}
    
    </EmailContext.Provider>
  );
};

export default EmailProvider;

export const useNav = () => {

  return useContext(EmailContext);
};
