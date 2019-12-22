import React from "react";

type GlobalContextProps = { 
  toggleLoader: Function;
  loggedIn: boolean;
};
export const GlobalContext = React.createContext<Partial<GlobalContextProps>>({});