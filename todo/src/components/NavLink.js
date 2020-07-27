import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const NavLink = ({ action, text, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.link}
      onPress={() => {
        // console.log(action);
        navigation.navigate(action);
      }}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center"
  },
  link: {
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 42
  }
});
export default NavLink;
