import React, { useReducer } from "react";

// reducer will be different for any another app
//  actions are just helper functions
// initial state will be different for different type apps

export default (reducer, actions, initialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // actions === { addblogposts: (dispatch) =>{return ()=>{}} }
    const boundActions = {};
    for (let key in actions) {
      //key === 'addBlogPost'
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
