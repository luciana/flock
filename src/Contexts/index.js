import React, { createContext, useReducer } from "react";
import { STATENAME } from "../Constants";
import AppReducer from "./Reducers";

const initial = { 
    lang: "en-US",
    user: null,
 };

const getState = () => { 
  let s =  localStorage.getItem(STATENAME)
    ? JSON.parse(localStorage.getItem(STATENAME))
    : initial;
    console.log('Context get State', s);
    return s;
  
  }

const mainReducer = (state, action) => AppReducer(state, action);

const AppContext = createContext({ state: getState(), dispatch: () => null });

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(mainReducer, getState());
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };