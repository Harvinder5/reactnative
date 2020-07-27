import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

const App = () => {
  return (
    <View style={{flex: 1}}>
      {/* <View> */}
      <LottieView source={require('./animation.json')} autoPlay loop />
      {/* <LottieView source={require('./animationc.json')} autoPlay loop /> */}
      {/* <LottieView source={require('./animationd.json')} autoPlay loop /> */}
      {/* <LottieView source={require('./animatione.json')} autoPlay loop /> */}
      {/* </View> */}
      {/* <View>
        <LottieView source={require('./animationb.json')} autoPlay loop />
      </View> */}
    </View>
  );
};

export default App;
