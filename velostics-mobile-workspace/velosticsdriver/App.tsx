/* eslint-disable import/first */
import React, {
  ComponentProps,
  ComponentType,
  useContext,
  useEffect,
  useState
} from "react";

import styled, { ThemeProvider } from "styled-components/native";

import "intl";
import "intl/locale-data/jsonp/en";
import "intl/locale-data/jsonp/es";

import { Analytics } from "@velostics/shared";
import { InAppNotificationManager } from "@velostics/shared/src/notifications";
import {
  NavigationService,
  ONE_SIGNAL_DRIVER,
  theme
} from "@velostics/shared/src/settings";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import axios from "axios";
import * as Font from "expo-font";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import codePush, { CodePushOptions } from "react-native-code-push";
import FlashMessage from "react-native-flash-message";
import OneSignal from "react-native-onesignal";
import { Asset } from "react-native-unimodules";
import { SafeAreaView } from "react-navigation";

import Config from "./env";
import { I18nProvider } from "./src/contexts/I18n.context";
import Navigator from "./src/main/screens/Navigator";
import { AuthStoreContext } from "./src/stores/AuthStore";
import { LocalNotificationService } from "./src/services/LocalNotificationService";
import ImageUpload from "@velostics/shared/src/uikit/datadisplay/ImageUpload";
globalThis.Intl = require("intl");

const codePushOptions: CodePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL
};

/**
 * AXIOS CONFIG
 */
axios.defaults.baseURL = `${Config.API_HOST}/v1`;

/**
 * ONE SIGNAL INIT
 */
OneSignal.init(ONE_SIGNAL_DRIVER);
OneSignal.inFocusDisplaying(0);

StyleSheet.setStyleAttributePreprocessor("fontFamily", Font.processFontFamily);

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

type StyledSafeAreaViewProps = {
  light?: boolean;
} & ComponentProps<typeof SafeAreaView>;

const StyledSafeAreaView = styled<ComponentType<StyledSafeAreaViewProps>>(
  SafeAreaView
).attrs({
  forceInset: { top: "never" }
})`
  flex: 1;
  background-color: ${props =>
    props.light ? props.theme.colors.white[0] : props.theme.colors.primary[0]};
  justify-content: center;
`;

const loadFonts = () =>
  Font.loadAsync({
    IconAssets: require("./assets/fontello.ttf"),
    MaterialIcons: require("./android/app/src/main/assets/fonts/MaterialIcons.ttf"),
    "SF-PRO-TEXT-REGULAR": require("./assets/fonts/SFProText/SF-Pro-Text-Regular.otf"),
    "SF-PRO-TEXT-BOLD": require("./assets/fonts/SFProText/SF-Pro-Display-Bold.otf"),
    "SF-PRO-TEXT-HEAVY": require("./assets/fonts/SFProText/SF-Pro-Text-Heavy.otf"),
    "SF-PRO-TEXT-SEMIBOLD": require("./assets/fonts/SFProText/SF-Pro-Display-Semibold.otf"),
    "SF-PRO-TEXT-MEDIUM": require("./assets/fonts/SFProText/SF-Pro-Text-Medium.otf"),
    "S-PRO-REGULAR": require("./assets/fonts/Source_Sans_Pro/SourceSansPro-Regular.ttf"),
    "S-PRO-SEMIBOLD": require("./assets/fonts/Source_Sans_Pro/SourceSansPro-SemiBold.ttf"),
    "S-PRO-BOLD": require("./assets/fonts/Source_Sans_Pro/SourceSansPro-Bold.ttf"),
    "S-PRO-LIGHT": require("./assets/fonts/Source_Sans_Pro/SourceSansPro-Light.ttf")
  });

const loadImages = () =>
  Promise.all(
    cacheImages([
      "https://user-images.githubusercontent.com/38377482/64945352-faba1c00-d88d-11e9-87d6-613badf42d85.png",
      require("./assets/logo.png")
    ])
  );

const App = () => {
  const [loading, setLoading] = useState(true);
  const authStore: any = useContext(AuthStoreContext);

  useEffect(() => {
    Analytics.init();
    LocalNotificationService.configure();

    // if (
    //   process.env.NODE_ENV === "staging" ||
    //   process.env.NODE_ENV === "production" ||
    //   process.env.NODE_ENV === "qa" ||
    //   process.env.NODE_ENV === "testing"
    // ) {
    //   codePush.sync({
    //     installMode: codePush.InstallMode.IMMEDIATE,
    //     mandatoryInstallMode: codePush.InstallMode.IMMEDIATE
    //   });
    // }

    Promise.all([loadFonts(), loadImages()]).then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  return (
    <I18nProvider>
      <ThemeProvider theme={theme}>
        <ActionSheetProvider>
          <>
            <StyledSafeAreaView light={authStore.isLoggedIn}>
              <Navigator
                ref={navigatorRef => {
                  NavigationService.setTopLevelNavigator(navigatorRef);
                }}
                screenProps={theme}
              />
            </StyledSafeAreaView>
            <FlashMessage position="top" />
            <InAppNotificationManager />
          </>
        </ActionSheetProvider>
      </ThemeProvider>
    </I18nProvider>
  );
};

export default codePush(codePushOptions)(App);
