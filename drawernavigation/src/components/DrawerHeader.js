import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";

const DrawerHeader = ({ username }) => {
  return (
    <View>
      <Image style={styles.image} source={require("../images/img.jpeg")} />
      <Text style={styles.name}>{username}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 15,
    borderColor: "#ffffff",
    borderWidth: 2
  },
  name: {
    textAlign: "center",
    fontSize: 18,
    color: "#efefef",
    padding: 10
  }
});

export default DrawerHeader;
