import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen';
import ChatScreen from './src/screens/ChatScreen';

const navigator = createStackNavigator(
  {
    Login: LoginScreen,
    Chat: ChatScreen,
  },
  {
    headerMode: 'none',
  },
);

const App = createAppContainer(navigator);

export default () => {
  return <App />;
};
