import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const Cards = ({title}) => {
  title = 'Lorem';
  return (
    <View style={styles.parent}>
      <Image style={styles.icon} source={require('../images/images.png')} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    borderRadius: 5,
    flexDirection: 'column',
    backgroundColor: '#efefef',
    alignItems: 'center',
    padding: 15,
    flex: 1,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  icon: {width: 70, height: 70, borderRadius: 35},
  title: {
    fontSize: 16,
    color: '#04bcce',
    fontWeight: 'bold',
  },
});

export default Cards;
