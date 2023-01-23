import React, { createContext, useReducer } from "react";
import { STATENAME } from "../Constants";
import AppReducer from "./Reducers";

const initial = { 
  lang: "en-US",
  user: null,
 };

const getState = () =>
  localStorage.getItem(STATENAME)
    ? JSON.parse(localStorage.getItem(STATENAME))
    : initial;

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