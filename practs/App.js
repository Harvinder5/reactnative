import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import IndexScreen from "./src/screens/IndexScreen";
import { Provider } from "./src/context/BlogContext";

const navigator = createStackNavigator(
  {
    Index: IndexScreen
  },
  {
    initialRouteName: "Index",
    defaultNavigationOptions: {
      title: "HH App"
    }
  }
);

const App = createAppContainer(navigator);

export default () => {
  console.log("app.js is exported");
  return (
    <Provider>
      <App />
    </Provider>
  );
};
