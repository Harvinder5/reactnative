import React from 'react';
import {StyleSheet, View, Animated, Image} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

var size = 24;
const TwitterStyle = () => {
  return (
    <View style={styles.parent}>
      <Entypo name="beamed-note" size={size} color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#0e69ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TwitterStyle;
