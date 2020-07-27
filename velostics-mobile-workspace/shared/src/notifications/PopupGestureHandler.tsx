import React, { FC, useCallback, useEffect, useRef, useState } from "react";

import {
  Animated,
  PanResponder,
  PanResponderCallbacks,
  PanResponderInstance,
  TouchableWithoutFeedback,
  View
} from "react-native";

import { PopupPositioner } from "./atoms/PopupPositioner";

type PopupGestureHandlerProps = {
  onPress?: () => any;
  onDismissal?: () => any;
  duration?: number;
  slideInDuration?: number;
  slideOutDuration?: number;
  zIndex: number;
};

export const PopupGestureHandler: FC<PopupGestureHandlerProps> = ({
  onPress,
  onDismissal,
  duration = 2500,
  slideInDuration = 300,
  slideOutDuration = 300,
  zIndex,
  children
}) => {
  const adjustedDuration = duration + slideInDuration + slideOutDuration;

  const [visible, setVisibility] = useState(false);
  const containerSlideOffsetY = useRef(new Animated.Value(0));
  const containerDragOffsetY = useRef(new Animated.Value(0));
  const containerScale = useRef(new Animated.Value(1));
  const autoDismissalTimerRef = useRef<number>();

  const clearDismissalTimer = useCallback(
    () => clearTimeout(autoDismissalTimerRef.current),
    []
  );

  const onPressInFeedback = useCallback(() => {
    Animated.spring(containerScale.current, {
      toValue: 0.95,
      friction: 8
    }).start();
  }, [containerScale]);

  const onPressOutFeedback = useCallback(() => {
    Animated.spring(containerScale.current, {
      toValue: 1,
      friction: 8
    }).start();
  }, [containerScale]);

  const onPanResponderGrant: PanResponderCallbacks["onPanResponderGrant"] = useCallback(
    (_e, _gestureState) => {
      onPressInFeedback();
    },
    [onPressInFeedback]
  );

  const onPanResponderMove: PanResponderCallbacks["onPanResponderMove"] = useCallback(
    (_e, gestureState) => {
      const newDragOffset = gestureState.dy < 100 ? gestureState.dy : 100;
      containerDragOffsetY.current.setValue(newDragOffset);
    },
    [containerDragOffsetY, onPressInFeedback]
  );

  const slideOutAndDismiss = useCallback(() => {
    Animated.timing(containerSlideOffsetY.current, {
      toValue: 0,
      duration: slideOutDuration
    }).start(() => {
      setVisibility(false);
      if (typeof onDismissal === "function") {
        onDismissal();
      }
    });
  }, [slideOutDuration]);

  const beginAutoDismissalTimer = useCallback(() => {
    if (duration > 0) {
      autoDismissalTimerRef.current = setTimeout(() => {
        slideOutAndDismiss();
      }, adjustedDuration) as any;
    }
  }, [duration, adjustedDuration]);

  const slideIn = useCallback(() => {
    Animated.timing(containerSlideOffsetY.current, {
      toValue: 1,
      duration: slideInDuration
    }).start(() => {
      beginAutoDismissalTimer();
    });
  }, [slideInDuration, beginAutoDismissalTimer]);

  const handlePress = useCallback(() => {
    if (typeof onPress === "function") {
      onPress();
      slideOutAndDismiss();
    }
  }, [slideOutAndDismiss, onPress]);

  const onPanResponderRelease: PanResponderCallbacks["onPanResponderMove"] = useCallback(
    (_e, gestureState) => {
      onPressOutFeedback();

      if (
        gestureState.dy <= 2 &&
        gestureState.dy >= -2 &&
        gestureState.dx <= 2 &&
        gestureState.dx >= -2
      ) {
        handlePress();
      }

      // TODO: This may break in the future
      // @ts-ignore
      if (containerDragOffsetY.current._value < -30) {
        slideOutAndDismiss();
      } else {
        clearDismissalTimer();

        Animated.timing(containerDragOffsetY.current, {
          toValue: 0,
          duration: 200
        }).start(() => {
          beginAutoDismissalTimer();
        });
      }
    },
    [
      onPressOutFeedback,
      handlePress,
      beginAutoDismissalTimer,
      clearDismissalTimer
    ]
  );

  const panResponderRef = useRef<PanResponderInstance>();

  useEffect(() => {
    panResponderRef.current = PanResponder.create({
      onStartShouldSetPanResponder: (_e, _gestureState) => true,
      // onStartShouldSetPanResponderCapture: (e, gestureState) => false,
      onMoveShouldSetPanResponder: (_e, _gestureState) => true,
      // onMoveShouldSetPanResponderCapture: (e, gestureState) => false,
      onPanResponderGrant: onPanResponderGrant,
      onPanResponderMove: onPanResponderMove,
      onPanResponderRelease: onPanResponderRelease
    });

    setVisibility(true);
  }, [onPanResponderGrant, onPanResponderMove, onPanResponderRelease]);

  useEffect(() => {
    if (visible === true) {
      slideIn();
    }
  }, [visible, slideIn]);

  return visible ? (
    <PopupPositioner
      containerSlideOffsetY={containerSlideOffsetY.current}
      containerDragOffsetY={containerDragOffsetY.current}
      containerScale={containerScale.current}
      zIndex={zIndex}
      {...panResponderRef.current.panHandlers}
    >
      <TouchableWithoutFeedback onPress={handlePress}>
        <View>{children}</View>
      </TouchableWithoutFeedback>
    </PopupPositioner>
  ) : null;
};
