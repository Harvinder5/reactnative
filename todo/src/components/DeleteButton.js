import React from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";

const DeleteButton = () => {
  return (
    <TouchableOpacity style={styles.delete}>
      <Image style={styles.image} source={require("../images/trash.png")} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  delete: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#aa0000",
    backgroundColor: "#aa0000",
    alignSelf: "flex-end"
  },
  image: {
    width: 26,
    height: 26,
    alignSelf: "center",
    tintColor: "#ffffff"
  }
});
export default DeleteButton;
