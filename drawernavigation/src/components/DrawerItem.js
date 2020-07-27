import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const MenuItem = ({ icon, navigation, text, isFocused }) => {
  console.log(isFocused);
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.toggleDrawer();
        navigation.navigate(text);
      }}
    >
      <Feather name={icon} color="#000000" size={20} style={styles.icon} />
      {isFocused === true ? (
        <Text style={styles.textSelected}>{text}</Text>
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    marginTop: 5,
    marginRight: 15,
    marginBottom: 5,
    alignItems: "center"
    // ,
    // backgroundColor: "#ff3563",
    // borderTopEndRadius: 1,
    // borderBottomEndRadius: 10
  },
  text: {
    fontSize: 20,
    textAlign: "left",
    padding: 6,
    paddingLeft: 20
  },
  textSelected: {
    fontSize: 22,
    textAlign: "left",
    padding: 6,
    paddingLeft: 20,
    color: "#000000"
  },
  icon: {
    marginStart: 25
  }
});

export default MenuItem;
