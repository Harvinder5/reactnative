import { Dimensions, Platform } from "react-native";

export const {
  height: deviceHeight,
  width: deviceWidth,
  scale: deviceScale,
  fontScale: deviceFontScale
} = Dimensions.get("window");

export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";