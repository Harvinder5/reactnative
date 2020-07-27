import React, { useEffect, useContext } from "react";
import codePush from "react-native-code-push";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import OneSignal from "react-native-onesignal";
import { injectIntl } from "react-intl";
import SplashScreen from "react-native-splash-screen";
import { observer } from "mobx-react-lite";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthStoreContext } from "../../../stores/AuthStore";

const AppLoading = ({ navigation, intl }) => {
  const authStore = useContext(AuthStoreContext);
  // Fetch the token from storage then navigate to our appropriate place
  const fetchUser = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    if (userToken) {
      await authStore.fetchUser();
      OneSignal.setSubscription(true);
    }
    SplashScreen.hide();
    navigation.navigate(authStore.isLoggedIn ? "App" : "Auth");
  };
  useEffect(() => {
    codePush.sync({
      updateDialog: {
        title: intl.formatMessage({ id: "codepush.title" }),
        optionalUpdateMessage: intl.formatMessage({
          id: "codepush.optionalupdatemessage"
        }),
        optionalInstallButtonLabel: intl.formatMessage({
          id: "codepush.installbuttonlabel"
        }),
        optionalIgnoreButtonLabel: intl.formatMessage({
          id: "codepush.optionalignorebuttonlabel"
        }),
        mandatoryUpdateMessage: intl.formatMessage({
          id: "codepush.mandatoryupdatemessage"
        }),
        mandatoryContinueButtonLabel: intl.formatMessage({
          id: "codepush.mandatorycontinuebutton"
        })
      },
      installMode: codePush.InstallMode.IMMEDIATE
    });
    fetchUser();
  }, []);

  return (
    <View>
      <StatusBar barStyle="default" />
      <ActivityIndicator size="large" />
    </View>
  );
};
export default observer(injectIntl(AppLoading));
