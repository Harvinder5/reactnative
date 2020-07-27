import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const CircleImage = ({width, height, borderRadius}) => {
  return (
    <View>
      <Image
        style={{width, height, borderRadius}}
        source={require('../images/images.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CircleImage;
