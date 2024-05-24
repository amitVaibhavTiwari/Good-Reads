/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";
const globalContext = createContext();
const root = document.documentElement;

export const useGlobalContext = () => useContext(globalContext);

const GlobalContext = ({ children }) => {
  const defaultState = {
    theme: "light",
    currentlyLoggedInUser: false,
  };

  const reducer = (state, action) => {
    // to get user's preferred theme initially when the app loads.
    if (action.type == "GET_INITIAL_THEME_PREFERENCE") {
      const userPreferredTheme = localStorage.getItem("THEME");
      if (userPreferredTheme) {
        // means user has once opened our application and has a theme preference saved.
        root.classList.add(`${userPreferredTheme}`);
        return { ...state, theme: userPreferredTheme };
      } else {
        const prefersDarkMode = window.matchMedia(
          "(prefers-color-scheme:dark)"
        ).matches;
        if (prefersDarkMode === true) {
          // user likes dark mode by default
          root.classList.add(`dark`);
          return { ...state, theme: "dark" };
        }
        if (prefersDarkMode === false) {
          // user likes light mode by default
          root.classList.add(`light`);
          return { ...state, theme: "light" };
        }
      }
    }

    // to change user's preferred theme
    if (action.type == "CHANGE_USER_THEME_PREFERENCE") {
      root.className = "";
      root.classList.add(action.payload.theme);
      localStorage.setItem("THEME", action.payload.theme);
      return { ...state, theme: action.payload.theme };
    }

    if (action.type == "SET_CURRENTLY_LOGGED_IN_USER") {
      return { ...state, currentlyLoggedInUser: action.payload };
    }
  };

  GlobalContext.propTypes = {
    children: PropTypes.object,
  };

  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <globalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </globalContext.Provider>
  );
};

export default GlobalContext;
