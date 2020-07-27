import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import Cards from '../components/Cards';
import CardLandscape from '../components/CardLandscape';
import Spacer from '../components/Spacer';
import CircleImage from '../components/CircleImage';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.parent} showsVerticalScrollIndicator={false}>
      <Image style={styles.profile} source={require('../images/images.png')} />
      <Text style={styles.title}>Lorem Ipsum Dolor Amet</Text>
      <Text style={styles.heading}>Lorem Ipsum</Text>
      <StatusBar
        backgroundColor="rgba(0, 0, 0, 0.0)"
        barStyle="dark-content"
        translucent={true}
      />
      <View style={styles.card}>
        <Cards />
        <Spacer />
        <Cards />
      </View>

      <View style={styles.cardLand}>
        <CardLandscape />
      </View>

      <View style={styles.card}>
        <Cards />
        <Spacer />
        <Cards />
      </View>

      <View style={{...styles.card, marginVertical: 24}}>
        <Cards />
        <Spacer />
        <Cards />
      </View>

      <View style={{alignSelf: 'center'}}>
        <CircleImage width={100} height={100} borderRadius={50} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#04bcce',
  },
  card: {
    marginHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLand: {
    margin: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    marginStart: 24,
    marginTop: 40,
    fontWeight: 'bold',
    textShadowColor: '#808080',
    textShadowRadius: 1,
    textShadowOffset: {width: 0, height: 1},
    fontFamily: 'Schaeffer',
  },
  heading: {
    color: '#ffffff',
    fontSize: 18,
    marginStart: 24,
    marginVertical: 12,
  },
  profile: {
    position: 'absolute',
    width: 42,
    height: 42,
    alignSelf: 'flex-end',
    top: 42,
    end: 24,
    borderRadius: 21,
  },
});

export default HomeScreen;
