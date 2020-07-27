import React, { useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import DeviceInfo from "react-native-device-info";

const App = () => {
  const device = async () => {
    DeviceInfo.getDeviceName().then(deviceName => {
      // iOS: "Becca's iPhone 6"
      console.log("device name is");
      console.log(deviceName);

      // Android: ?
      // Windows: ?
    });

    console.log("build number is" + DeviceInfo.getBuildNumber());
  };

  useEffect(() => {
    device();
  }, []);
  console.log("dsfsfs");
  return <Text>hi this is akinator</Text>;
};

export default App;
