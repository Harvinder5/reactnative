import React from "react";
import { View, Text } from "react-native";
import MenuButton from "../components/MenuButtons";
import SvgIcon from "../images/SvgIcon";

const SettingsScreen = ({ navigation }) => {
  return (
    <View>
      <MenuButton navigation={navigation} />
      <Text>this is SettingsScreen</Text>
      <SvgIcon />
    </View>
  );
};

export default SettingsScreen;
