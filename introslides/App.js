import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import IntroScreen from "./src/screens/IntroScreen";

const navigator = createStackNavigator(
  {
    Intro: IntroScreen,
    Home: HomeScreen
  },
  {
    headerMode: "none"
  }
);

const App = createAppContainer(navigator);

export default () => {
  return <App />;
};
