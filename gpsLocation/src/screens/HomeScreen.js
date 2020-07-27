import React, { useEffect } from "react";
import { View, Text } from "react-native";
import ToastExample from "../../ToastExample";

const HomeScreen = () => {
  const showToast = async () => {
    try {
      const message = await ToastExample.show(
        "Here comes the Toast",
        ToastExample.SHORT
      );
      const message2 = await ToastExample.logit("hello HH");
    } catch (e) {
      console.log(e);
    }
  };

  const getValue = async () => {
    try {
      const hh = await ToastExample.doCallBackTask(
        10,
        (name, email, age) => {
          console.log(name, email, age);
          ToastExample.show(
            `name = ${name} email= ${email} age= ${age}`,
            ToastExample.SHORT
          );
        },
        errorMessage => {
          console.log("this is error " + errorMessage);
          ToastExample.show(errorMessage, ToastExample.SHORT);
        }
      );
    } catch (e) {}
  };

  //promise

  const getPromiseValue = async () => {
    try {
      let result = await ToastExample.doPromiseTask(11);
      ToastExample.show(
        `Result = ${JSON.stringify(result)}`,
        ToastExample.SHORT
      );
    } catch (error) {
      ToastExample.show(`Error  = ${error}`, ToastExample.LONG);
    }
  };

  useEffect(() => {
    // showToast();
    // getValue();
    getPromiseValue();
  });

  return (
    <View>
      <Text>This is HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
