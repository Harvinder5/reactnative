import React from "react";
import {
  Platform,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import DrawerItem from "./DrawerItem";
import SeparatorLine from "./SeparatorLine";
import DrawerHeader from "./DrawerHeader";

const MenuDrawer = ({ navigation }) => {
  console.log(navigation);
  return (
    <View style={styles.container}>
      <View style={styles.topLinks}>
        <DrawerHeader username="React Native" />
      </View>
      <View style={styles.bottomLinks}>
        <DrawerItem
          icon="home"
          navigation={navigation}
          isFocused={navigation._childrenNavigation.Home.isFocused()}
          text="Home"
        />
        <DrawerItem
          icon="clock"
          navigation={navigation}
          isFocused={navigation._childrenNavigation.Reminder.isFocused()}
          text="Reminder"
        />
        <SeparatorLine />
        <DrawerItem
          icon="file-text"
          navigation={navigation}
          isFocused={navigation._childrenNavigation.Notes.isFocused()}
          text="Notes"
        />
        <DrawerItem
          icon="settings"
          navigation={navigation}
          isFocused={navigation._childrenNavigation.Settings.isFocused()}
          text="Settings"
        />
        <SeparatorLine />
        <DrawerItem
          icon="help-circle"
          navigation={navigation}
          isFocused={navigation._childrenNavigation.Help.isFocused()}
          text="Help"
        />
      </View>
      <View style={styles.version}>
        <View style={{ borderColor: "#232323", borderWidth: 1 }}></View>
        <Text style={{ textAlign: "center", paddingTop: 10 }}>
          Devleoped by HH Singh
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef"
  },
  topLinks: {
    height: 165,
    backgroundColor: "#000000"
  },
  bottomLinks: {
    flex: 1,
    backgroundColor: "#efefef",
    paddingTop: 10
  },
  version: {
    backgroundColor: "#efefef",
    height: 40
  }
});

export default MenuDrawer;
