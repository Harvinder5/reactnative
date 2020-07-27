import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import FabScreen from './src/screens/FabScreen';
import FabScreenB from './src/screens/FabScreenB';
import TwitterStyle from './src/screens/TwitterStyle';

const navigator = createStackNavigator(
  {
    Fab: FabScreen,
    FabB: FabScreenB,
    Tweet: TwitterStyle,
    Home: HomeScreen,
  },
  {
    headerMode: 'none',
  },
);

const App = createAppContainer(navigator);

export default () => {
  return <App />;
};
