import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

var open;
var animation = new Animated.Value(0);
var toggleMenu = () => {
  const toValue = open ? 0 : 1;
  Animated.spring(animation, {
    toValue,
    friction: 5,
  }).start();

  open = !open;
};

const FabScreen = () => {
  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
  };

  const beamedNote = {
    transform: [
      {scale: animation},
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80],
        }),
      },
    ],
  };

  const thumbsUp = {
    transform: [
      {scale: animation},
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -140],
        }),
      },
    ],
  };

  const locationPin = {
    transform: [
      {scale: animation},
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -200],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View
          style={[styles.button, styles.secondary, styles.menu, beamedNote]}>
          <Entypo name="beamed-note" size={24} color="#fff" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View
          style={[styles.button, styles.secondary, styles.menu, thumbsUp]}>
          <Entypo name="thumbs-up" size={24} color="#fff" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View
          style={[styles.button, styles.secondary, styles.menu, locationPin]}>
          <Entypo name="location-pin" size={24} color="#fff" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View style={[styles.button, styles.menu, rotation]}>
          <AntDesign name="plus" size={24} color="#fff" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowRadius: 3,
    // shadowColor: '#f02a4b',
    // shadowOpacity: 0.3,
    // shadowOffset: {height: 0, width: 0},
    backgroundColor: '#f02a4b',
    elevation: 5,
  },
  menu: {
    backgroundColor: '#f02a4b',
  },
  secondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});

export default FabScreen;
