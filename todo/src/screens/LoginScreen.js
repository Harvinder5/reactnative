import React from "react";
import { Text, View, StyleSheet } from "react-native";
import AuthScreen from "../components/AuthScreen";

const LoginScreen = ({ navigation }) => {
  return (
    <AuthScreen
      actionText="LOGIN"
      action="AddEdit"
      navLinkText="Don't have an account yet? Signup"
      navAction="Signup"
      navigation={navigation}
    />
  );
};

LoginScreen.navigationOptions = () => {
  return {
    header: null
  };
};

export default LoginScreen;
