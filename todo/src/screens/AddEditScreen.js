import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import TodoScreen from "../components/TodoScreen";

const AddToDoScreen = ({ navigation }) => {
  return (
    <View>
      <TodoScreen title="ADD TODO" />
    </View>
  );
};

AddToDoScreen.navigationOptions = () => {
  return {
    header: null
  };
};

export default AddToDoScreen;
