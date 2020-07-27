import React, { Component, useState, useEffect } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import SplashScreen from "react-native-splash-screen";
import DeviceInfo from "react-native-device-info";
import ImagePicker from "react-native-image-crop-picker";
import database from "@react-native-firebase/database";
// import { firebase } from "@react-native-firebase/database";
import analytics from "@react-native-firebase/analytics";
import { firebase } from "@react-native-firebase/analytics";
import OneSignal from "react-native-onesignal"; // Import package from node modules
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Config from "react-native-config";
import SmsRetriever from "react-native-sms-retriever";
import Dash from "react-native-dash";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  TouchableRipple
} from "react-native-paper";

const HomeScreen = () => {
  const [pickedImage, setPickedImage] = useState({});
  const [packageId, setPackageId] = useState("");

  const initOneSignal = () => {
    // OneSignal.init("8189e424-0e70-46f3-81e2-4c435f57c6fd");//for android
    OneSignal.init("8189e424-0e70-46f3-81e2-4c435f57c6fd", {
      kOSSettingsKeyAutoPrompt: true
    }); // for ios and android rest settings will be ignored by android auto

    OneSignal.addEventListener("received", onReceived);

    let xyz = DeviceInfo.getBundleId();
    console.log(`android/ios bundle=${xyz}`);
    setPackageId(xyz);
  };
  const onReceived = notification => {
    console.log("Notification received: ", notification);
  };

  const init = async () => {
    setTimeout(async () => {
      SplashScreen.hide();

      let brand = DeviceInfo.getBrand();

      DeviceInfo.getAndroidId().then(androidId => {
        setPackageId(androidId);
        console.log("from method" + androidId);
      });

      console.log("from line " + DeviceInfo.getAndroidId());

      DeviceInfo.getBuildId().then(buildId => {
        console.log(buildId);
      });

      const result = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true
      });

      setPickedImage(result);
      let hasNotch = DeviceInfo.hasNotch();
      hasNotch ? console.log("has notch") : console.log("notchless");

      DeviceInfo.getTotalMemory().then(totalMemory => {
        // 1995018240
        console.log(totalMemory);
      });

      console.log(brand);
      DeviceInfo.getAndroidId().then(androidId => {
        console.log("android id:" + androidId);
      });

      // onSignIn();
    }, 3000);
  };

  getPhoneNumber = async () => {
    try {
      const phoneNumber = await SmsRetriever.requestPhoneNumber();
      console.log(phoneNumber);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  onSmsReceived = async () => {
    try {
      const registered = await SmsRetriever.startSmsRetriever();
      if (registered) {
        SmsRetriever.addSmsListener(event => {
          console.log(event.message);
          SmsRetriever.removeSmsListener();
        });
      } else {
        console.log("not regitered");
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  // const onProductView = async () => {
  //   await analytics().logEvent("product_view", {
  //     id: "123456789",
  //     color: "red",
  //     via: "ProductCatalog"
  //   });
  // };

  useEffect(() => {
    // init();
    // onProductView();
    // getPhoneNumber();
    onSmsReceived();
    console.log("HH" + Config.APP_NAME);
    SplashScreen.hide();
    initOneSignal();
  }, []);
  const handleImage = async () => {
    const result = await ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    });
    console.log(result);
    setPickedImage(result);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImage}>
        <Text>Click here to select image</Text>
      </TouchableOpacity>

      <Card>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={props => <Avatar.Icon {...props} icon="folder" />}
        />
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>

      <TouchableRipple
        onPress={() => console.log("Pressed")}
        rippleColor="rgba(0, 0, 0, .32)"
      >
        <Text>i am working from code push</Text>
      </TouchableRipple>

      <Image
        source={{ uri: pickedImage.path }}
        key={pickedImage}
        style={{ width: 100, height: 100 }}
      />
      {/* <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
      ></MapView> */}

      <Dash
        style={{ width: 200, height: 1 }}
        dashGap={4}
        dashLength={6}
        dashThickness={5}
        dashColor="#ff00ff"
      />
      <Text>{Config.PACKAGE_NAME}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

export default HomeScreen;
