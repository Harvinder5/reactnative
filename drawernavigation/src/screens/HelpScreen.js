import React from "react";
import { Text, View } from "react-native";
import MenuButton from "../components/MenuButtons";

const HelpScreen = ({ navigation }) => {
  return (
    <View>
      <MenuButton navigation={navigation} />
      <Text>this is Help Screen</Text>
    </View>
  );
};

export default HelpScreen;
