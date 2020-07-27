import React from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import HomeScreen from "./src/screens/HomeScreen";
import HelpScreen from "./src/screens/HelpScreen";
import SettingScreen from "./src/screens/SettingScreen";
import NotesScreen from "./src/screens/NotesScreen";
import ReminderScreen from "./src/screens/ReminderScreen";
import Icon from "react-native-vector-icons";
import { Feather } from "@expo/vector-icons";

const navigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: HomeScreen,

      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <View>
            {focused ? (
              <Feather name="home" color={tintColor} size={24} />
            ) : (
              <Feather name="home" color={tintColor} size={20} />
            )}
          </View>
        ),
        activeColor: "#ffffff",
        barStyle: { backgroundColor: "#ff5555" }
      }
    },
    Help: {
      screen: HelpScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <View>
            {focused ? (
              <Feather name="help-circle" color={tintColor} size={24} />
            ) : (
              <Feather name="help-circle" color={tintColor} size={20} />
            )}
          </View>
        ),
        activeColor: "#ffffff",
        barStyle: { backgroundColor: "#0098ff" }
      }
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <View>
            {focused ? (
              <Feather name="settings" color={tintColor} size={24} />
            ) : (
              <Feather name="settings" color={tintColor} size={20} />
            )}
          </View>
        ),
        activeColor: "#000000",
        inactiveColor: "#ffffff",
        barStyle: { backgroundColor: "#fff000" }
      }
    },
    Notes: {
      screen: NotesScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <View>
            {focused ? (
              <Feather name="list" color={tintColor} size={24} />
            ) : (
              <Feather name="list" color={tintColor} size={20} />
            )}
          </View>
        )
      }
    },
    Reminder: {
      screen: ReminderScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <View>
            {focused ? (
              <Feather name="clock" color={tintColor} size={24} />
            ) : (
              <Feather name="clock" color={tintColor} size={20} />
            )}
          </View>
        ),
        activeColor: "#ffffff",
        barStyle: { backgroundColor: "#99ff34" }
      }
    }
  },
  {
    initialRouteName: "Home",
    activeColor: "#f0edf6",
    inactiveColor: "#000000",
    shifting: true,
    barStyle: { backgroundColor: "#694fad" },
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: "#000000",
      showIcon: true,
      style: {
        backgroundColor: "#ff7878"
      },
      labelStyle: {
        fontSize: 12
      },
      tabStyle: {
        padding: 1,
        marginTop: 10
      },
      indicatorStyle: {
        backgroundColor: "#ffffff"
      }
    }
  }
);

const App = createAppContainer(navigator);

export default () => {
  return <App />;
};
