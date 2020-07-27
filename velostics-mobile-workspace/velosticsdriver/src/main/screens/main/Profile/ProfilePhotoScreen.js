import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  Button,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet
} from 'react-native';
import { FluidNavigator, Transition } from 'react-navigation-fluid-transitions';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { NavBar } from '@velostics/shared';
import Avatar from '../../../components/Images/Avatar';
const { width } = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  detailsImage: {
    width: 150,
    height: 150,
    borderRadius: 75
  },
  detailsView: {
    padding: 10,
    backgroundColor: '#ECECEC',
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  text: {
    paddingBottom: 40
  },
  row: {
    flexDirection: 'row'
  },
  cell: {
    margin: 2
  },
  header: {
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000FA'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFF'
  },
  imageContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class ProfilePhotoScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const uri = navigation.getParam('url', '');
    return (
      <View style={styles.container}>
        {/* <Transition anchor={uri}> */}
        <NavBar noLocale title="" />
        {/* </Transition> */}
        <View style={styles.imageContainer}>
          <Transition shared={uri}>
            {/* <Image style={styles.detailsImage} source={{ uri }} /> */}
            <Avatar
              size={0.8 * width}
              source={{
                uri
              }}
            />
          </Transition>
        </View>
      </View>
    );
  }
}
export default ProfilePhotoScreen;
