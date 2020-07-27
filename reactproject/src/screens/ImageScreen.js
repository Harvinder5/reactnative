import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ImageDetail from "../components/ImageDetail"; // here we have imported the child ImageD etail into the parent ImageScreen

const ImageScreen = () => {
  return (
    <View>
      <ImageDetail
        title="Forest"
        score = {9}
        imageSource={require("../../assets/forest.jpg")}
      />
      <ImageDetail
        title="Beach"
        score = {8}
        imageSource={require("../../assets/beach.jpg")}
      />
      <ImageDetail
        title="Mountain"
        score={7}
        imageSource={require("../../assets/mountain.jpg")}
      />
      <ImageDetail
        title="Land"
        score={6}
        imageSource={require("../../assets/beach.jpg")}
      />
      <ImageDetail
        title="Desert"
        score={5}
        imageSource={require("../../assets/beach.jpg")}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ImageScreen;
