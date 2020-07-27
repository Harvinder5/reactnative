import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

const RoundButton = ({style, title, color, backgroundColor}) => {
  return (
    <TouchableOpacity
      style={{...styles.parent, backgroundColor}}
      activeOpacity={0.7}>
      <Text style={{...styles.title, color}}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  parent: {
    marginHorizontal: 24,
    height: 50,
    borderRadius: 25,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
});

export default RoundButton;
