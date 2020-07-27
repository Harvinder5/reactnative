import React from "react";
import { AsyncStorage } from "react-native";
import { createAppContainer } from "react-navigation";
import HomeScreen from "./src/screens/HomeScreen";
import AddEditScreen from "./src/screens/AddEditScreen";
import TestScreen from "./src/screens/TestScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import ToDoListScreen from "./src/screens/ToDoListScreen";
import { createStackNavigator } from "react-navigation-stack";
import { Provider as CrudProvider } from "./src/context/CRUDContext";

const navigator = createStackNavigator({
  AddEdit: AddEditScreen,
  ToDoList: ToDoListScreen,
  Signup: SignupScreen,
  Login: LoginScreen,
  Home: HomeScreen,
  TestScreen: TestScreen
});

const App = createAppContainer(navigator);

export default () => {
  return (
    <CrudProvider>
      <App />
    </CrudProvider>
  );
};
