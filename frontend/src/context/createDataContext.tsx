import React, { useReducer } from "react";

const DataContext = (reducer: any, actions: any, defaultValue: any) => {
  const Context = React.createContext(defaultValue);

  const Provider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions: any = {};
    for (const key in actions) {
      boundActions[key as keyof typeof boundActions] = actions[key](dispatch);
    }
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
export default DataContext;
