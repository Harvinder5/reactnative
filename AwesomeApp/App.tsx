import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "./src/screens/HomeScreen";
import CodePush, { CodePushOptions } from "react-native-code-push";
import Config from "react-native-config";

const codePushOptions: CodePushOptions = {
  deploymentKey:
    Platform.OS === "android" ? Config.CODE_PUSH_ANDROID : Config.CODE_PUSH_IOS,
  checkFrequency: CodePush.CheckFrequency.ON_APP_START
};

const navigator = createStackNavigator({
  Home: HomeScreen
});

const App = createAppContainer(navigator);

const myApp = () => {
  return <App />;
};

export default CodePush(codePushOptions)(myApp);
