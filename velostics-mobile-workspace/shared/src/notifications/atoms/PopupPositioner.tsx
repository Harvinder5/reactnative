import React, { FC } from "react";

import { Animated, GestureResponderHandlers, StatusBar } from "react-native";
import { hasNotch } from "react-native-device-info";

import { deviceWidth, isIOS } from "../../settings/device";

const HORIZONTAL_MARGIN = 8;

const CONTAINER_MARGIN_TOP = isIOS
  ? hasNotch()
    ? 44
    : 20
  : StatusBar.currentHeight + 10;

const popupContainerStyle = {
  position: "absolute",
  width: deviceWidth - HORIZONTAL_MARGIN * 2,
  left: HORIZONTAL_MARGIN,
  right: HORIZONTAL_MARGIN,
  top: CONTAINER_MARGIN_TOP
};

const slideOffsetYToTranslatePixelMapping = {
  inputRange: [0, 1],
  outputRange: [-150, 0]
};

const getAnimatedContainerStyle = ({
  containerSlideOffsetY,
  containerDragOffsetY,
  containerScale,
  zIndex
}) => {
  const slideInAnimationStyle = {
    transform: [
      {
        translateY: containerSlideOffsetY.interpolate(
          slideOffsetYToTranslatePixelMapping
        )
      },
      { translateY: containerDragOffsetY },
      { scale: containerScale }
    ],
    zIndex
  };

  return [popupContainerStyle, slideInAnimationStyle];
};

type PopupPositioner = {
  containerSlideOffsetY: number | Animated.Value;
  containerDragOffsetY: number | Animated.Value;
  containerScale: number | Animated.Value;
  zIndex: number;
} & GestureResponderHandlers;

export const PopupPositioner: FC<PopupPositioner> = ({
  containerSlideOffsetY,
  containerDragOffsetY,
  containerScale,
  zIndex,
  ...props
}) => (
  <Animated.View
    style={getAnimatedContainerStyle({
      containerSlideOffsetY,
      containerDragOffsetY,
      containerScale,
      zIndex
    })}
    {...props}
  />
);
