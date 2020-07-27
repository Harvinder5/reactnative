import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";

var width = Dimensions.get("window").width;

const SlidesItem = ({ title, text, backgroundColor, iconName }) => {
  return (
    <View
      style={{
        width: width,
        backgroundColor: backgroundColor
      }}
    >
      <Feather
        style={styles.icon}
        name={iconName}
        color="#00000088"
        size={100}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    alignSelf: "center"
  },
  description: {
    fontSize: 18,
    alignSelf: "center"
  },
  slide: {},
  icon: {
    alignSelf: "center",
    marginTop: 200
  }
});

export default SlidesItem;
