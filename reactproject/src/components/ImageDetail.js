import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

// const ImageDetail = props => {  //here i am using props in the next line lets 
const ImageDetail = ({imageSource, title, score})=>{
//   console.log(props);

  return (
    <View>
      <Image source={imageSource} />
      <Text>{title}</Text>
      <Text>Image Score - {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ImageDetail;
