import React from 'react';
import {StyleSheet, View, StatusBar, Image} from 'react-native';
import Animated from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import RoundButton from '../components/RoundButton';
import Spacer from '../components/Spacer';

const HomeScreen = () => {
  return (
    <View style={styles.screen}>
      <StatusBar
        backgroundColor="rgba(0, 0, 0, 0.0)"
        barStyle="light-content"
        translucent={true}
      />
      <Image
        style={styles.background}
        source={require('../images/leaf.jpeg')}
      />
      <View style={styles.buttonset}>
        <RoundButton
          title="SIGN IN"
          color="#353535"
          backgroundColor="#ffffff"
        />
        <Spacer />
        <RoundButton
          title="SIGN IN WITH FACEBOOK"
          color="#efefef"
          backgroundColor="#315dc6"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  background: {
    position: 'absolute',
    top: 0,
    start: 0,
  },
  buttonset: {
    flexGrow: 1,
    marginBottom: 12,
  },
});

export default HomeScreen;
