import React, { useReducer } from "react";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "add_blogpost":
      return [...state, { title: `blog post#${state.length + 1}` }];
    default:
      return state;
  }
};

const BlogContext = React.createContext();
/**
create context is the function of react library we will use it here for creating the context tada
*/
export const BlogProvider = ({ children }) => {
  // we are not exporting default here because we will export default it in the App.js then it will be exported from there

  const [blogPosts, dispatch] = useReducer(blogReducer, []); // first argurment is reducer itself then the second argurement is the initial value for the state that is empty arrray in this casse

  const addBlogPost = () => {
    dispatch({ type: "add_blogpost" });
  };

  return (
    <BlogContext.Provider value={{ data: blogPosts, addBlogPost }}>
      {children}
    </BlogContext.Provider>
  ); // here children is the custom component which will be send as a prop via app to here just like children : <Text> i am HH singh</Text>   something like this
};

export default BlogContext;
