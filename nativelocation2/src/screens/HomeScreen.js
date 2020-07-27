import React, { useEffect } from "react";
import { View, Text } from "react-native";
import ToastExample from "../../ToastExample";

const HomeScreen = () => {
  const showToast = async () => {
    try {
      const message = await ToastExample.show(
        "Let's Access the Native Modules",
        ToastExample.SHORT
      );
      const message2 = await ToastExample.logit("hello HH");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    showToast();
    measurement();
  });

  return (
    <View>
      <Text>This is HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
