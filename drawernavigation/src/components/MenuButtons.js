import React from "react";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const MenuButtons = ({ navigation }) => {
  return (
    <Feather
      name="menu"
      color="#000000"
      size={32}
      style={styles.menuIcon}
      onPress={() => {
        // console.log(navigation);
        navigation.toggleDrawer();
      }}
    />
  );
};

const styles = StyleSheet.create({
  menuIcon: {
    zIndex: 9,
    position: "absolute",
    top: 40,
    left: 20
  }
});

export default MenuButtons;
