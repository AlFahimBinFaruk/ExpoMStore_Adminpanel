import { useState, useContext, useEffect, createContext } from "react";

//alert context
const AppAlertContext = createContext(null);

//AppAlertProvider
const AppAlertProvider = ({ children }) => {
  //show alert default state
  const [showAlert, setShowAlert] = useState(false);

  //use effect to to listen for any change in show alert and to reset it back to default state.
  useEffect(() => {
    if (showAlert) {
      const alertTimeOut = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return () => clearTimeout(alertTimeOut);
    }
  }, [showAlert]);

  return (
    <AppAlertContext.Provider value={{ showAlert, setShowAlert }}>
      {children}
    </AppAlertContext.Provider>
  );
};
// export global context
export const useGlobalAlertContext = () => {
  return useContext(AppAlertContext);
};

//export alert context and provider
export { AppAlertContext, AppAlertProvider };
