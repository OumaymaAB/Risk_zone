import { createContext } from "react";

// localStorage.js
export const loadState = () => {
  const serializedState = localStorage.getItem("state-risks");
  if (serializedState !== null) {
    return JSON.parse(serializedState);
  } else return initialContext;
};
// localStorage.js
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state-risks", serializedState);
  } catch {
    // ignore write errors
  }
};
// localStorage.js
export const purgeState = () => {
  try {
    localStorage.clear();
  } catch {
    // ignore write errors
  }
};

export const initialState = {
  isLogged: false,
  user: null
};

export const initialContext = {
  context: initialState,
  setContext: () => {
    throw new Error("setContext function must be overridden");
  },
};
export const Context = createContext(initialContext);