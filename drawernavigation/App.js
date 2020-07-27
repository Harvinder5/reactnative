import React from "react";
import { Platform, Dimensions } from "react-native";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

import MenuDrawer from "./src/components/MenuDrawer";

import HomeScreen from "./src/screens/HomeScreen";
import ReminderScreen from "./src/screens/RemindersScreen";
import NotesScreen from "./src/screens/NotesScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import HelpScreen from "./src/screens/HelpScreen";

const WIDTH = Dimensions.get("window").width;
console.log(WIDTH); // it will return the width in dps not in pixels

const DrawerConfig = {
  drawerWidth: WIDTH * 0.75,
  drawerType: "front",
  contentComponent: ({ navigation }) => {
    return <MenuDrawer navigation={navigation} />;
  }
};

const navigator = createDrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Reminder: { screen: ReminderScreen },
    Notes: { screen: NotesScreen },
    Settings: { screen: SettingsScreen },
    Help: { screen: HelpScreen }
  },
  DrawerConfig
);

const App = createAppContainer(navigator);

export default App;
// export default () => {
//   return <App />;
// };
