import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer, useLinking } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Linking } from "expo";

const prefix = Linking.makeUrl("/");

/*
for ios give the below command
xcrun simctl openurl booted exp://127.0.0.1:19000/--/user/56
for android try below command
adb shell am start -W -a android.intent.action.VIEW -d "exp://127.0.0.1:19000/--/user/56" host.exp.exponent
*/

const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

const LoginScreen = ({ route, navigation }) => {
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

  const { getInitialState } = useLinking(ref, {
    prefixes: [prefix],
    config: {
      Login: "user/:id"
    }
  });

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    Promise.race([
      getInitialState(),
      new Promise(resolve =>
        // Timeout in 150ms if `getInitialState` doesn't resolve
        // Workaround for https://github.com/facebook/react-native/issues/25675
        setTimeout(resolve, 150)
      )
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
