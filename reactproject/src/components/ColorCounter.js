import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const ColorCounter = ({color,onIncrease,onDecrease}) => {
  return (
    <View><Text>{color}</Text>
      <Button onPress={() => onIncrease()} title={`Increase ${color}`} /> 
      {/* /* // so
      here we are usuing the callback function which we are accessing via props
      from the parent which is the SquareScreen.js and the rest of calculation
      will be done there just like we are using the navigator functionm in the
      homescreen which is using the navigate method via prop from the app.js*/}
      <Button onPress={() => onDecrease()} title={`Decrease ${color}`} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ColorCounter;
