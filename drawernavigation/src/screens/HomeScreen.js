import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import MenuButton from "../components/MenuButtons";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <MenuButton navigation={navigation} />
      <Text style={{ alignSelf: "center" }}>Hi this is HomeScreen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
