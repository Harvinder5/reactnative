import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useLinking } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

// const HomeScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text>This is HomeScreen</Text>
//     </View>
//   );
// };

const App = () => {
  const ref = React.useRef();

  const { getInitialState } = useLinking(ref, {
    prefixes: ["https://mychat.com", "mychat://"],
    config: {
      Signup: "signup"
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
  setInitialState({
    routes: {
      home: {
        title: "Home",
        component: HomeView
      },
      account: {
        title: "My Account",
        component: AccountView
      }
    }
  });
  const Stack = createStackNavigator();

  return (
    <NavigationContainer ref={ref}>
      {console.log("initial state hai")}
      {console.log(initialState)}
      <Stack.Navigator initialRouteName={"Home"}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
