import React from "react";
import { View, Text } from "react-native";
import MenuButton from "../components/MenuButtons";

const NotesScreen = ({ navigation }) => {
  return (
    <View>
      <MenuButton navigation={navigation} />
      <Text style={{ alignSelf: "center" }}>this is NotesScreen</Text>
    </View>
  );
};

export default NotesScreen;
