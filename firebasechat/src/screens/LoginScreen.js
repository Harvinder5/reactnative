import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class LoginScreen extends React.Component {
  state = {
    name: '',
  };

  continue = () => {
    this.props.navigation.navigate('Chat', {name: this.state.name});
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="rgba(0, 0, 0, 0.0)"
          barStyle="dark-content"
          translucent={true}
        />
        <View style={styles.circle} />
        <View style={{marginTop: 64}}>
          <Image
            style={{width: 100, height: 100, alignSelf: 'center'}}
            source={require('../images/chat.png')}
          />
        </View>

        <View style={{marginHorizontal: 32}}>
          <Text style={styles.header}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="username here"
            onChangeText={name => {
              this.setState({name});
            }}
            value={this.state.name}
          />

          <View style={{alignItems: 'flex-end', marginTop: 64}}>
            <TouchableOpacity style={styles.continue} onPress={this.continue}>
              <AntDesign name="cloud" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  circle: {
    width: 900,
    height: 900,
    borderRadius: 900 / 2,
    backgroundColor: '#efefff',
    position: 'absolute',
    top: -600,
    start: -400,
  },
  header: {
    fontWeight: '800',
    fontSize: 30,
    color: '#514e5a',
    marginTop: 32,
  },
  input: {
    marginTop: 32,
    height: 50,
    borderStyle: 'dashed',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#bab7c3',
    borderRadius: 25,
    paddingHorizontal: 16,
    color: '#514e5a',
    fontWeight: '600',
  },
  continue: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#9075e3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
