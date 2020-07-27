import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer, useLinking} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

/*hit the link abcxyz://user/56
and it will launch the app with deeplinking and the url info will be retrieved
in the route prop instead of navigation
check with this command on android emulator below command
adb shell am start -W -a android.intent.action.VIEW -d "abcxyz://user/56" com.nativelinking
*/

const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

const LoginScreen = ({route, navigation}) => {
  console.log(route.params.id);
  // Object.keys(navigation).forEach(key => {
  //   console.log(key);
  //   console.log('value:', navigation[key]);
  // });
  // console.log(navigation);
  return (
    <View>
      <Text>Login Screen</Text>
    </View>
  );
};

const Stack = createStackNavigator();

function App() {
  const ref = React.useRef();

  const {getInitialState} = useLinking(ref, {
    prefixes: ['https://abcxyz.com', 'abcxyz://'],
    config: {
      Login: 'user/:id',
    },
  });

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    Promise.race([
      getInitialState(),
      new Promise(resolve =>
        // Timeout in 150ms if `getInitialState` doesn't resolve
        // Workaround for https://github.com/facebook/react-native/issues/25675
        setTimeout(resolve, 150),
      ),
    ])
      .catch(e => {
        console.error(e);
      })
      .then(state => {
        if (state !== undefined) {
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer initialState={initialState} ref={ref}>
      {/* {console.log(initialState.routes[0].params)} */}
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
