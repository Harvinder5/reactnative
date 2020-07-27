import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const CardLandscape = ({title}) => {
  title = 'Lorem';
  return (
    <View style={styles.parent}>
      <Image style={styles.icon} source={require('../images/images.png')} />
      <View>
        <Text style={styles.title}>Lorem ipsum Dolor</Text>
        <Text style={styles.title}>so let it </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    borderRadius: 5,
    flexDirection: 'column',
    backgroundColor: '#efefef',
    alignItems: 'center',
    flex: 1,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: 'row',
    paddingVertical: 24,
  },
  icon: {width: 70, height: 70, borderRadius: 35, marginStart: 24},
  title: {
    paddingStart: 12,
    fontSize: 16,
    color: '#04bcce',
    fontWeight: 'bold',
  },
});

export default CardLandscape;
