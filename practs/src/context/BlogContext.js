import React, { useReducer } from "react";
import createDataContext from "./createDataContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "add_blogpost": {
      return [...state, { title: `Blogpost number ${state.length + 1}` }];
    }
    default: {
      return state;
    }
  }
};

const addBlogPost = dispatch => {
  return () => {
    dispatch({ type: "add_blogpost" });
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  { addBlogPost },
  []
);
