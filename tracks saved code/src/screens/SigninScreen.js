import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import AuthForm from "../components/AuthForm";
import Navlink from "../components/Navlink";
import { Context } from "../context/AuthContext";

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(Context);

  //NavigationEvents dosesnt display anything on the screen but it  is used to pass callback function as props... NavigationEvents is going to call them automatically everytime when we render navigate to or from the screen (in android context these are the lifecycle method of the activity)
  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />

      <AuthForm
        headerText="Sign In to your account"
        errorMessage={state.errorMessage}
        onSubmit={signin} // onsubmit will automatically call this sign in function with the object that has email and password that user has entered
        submitButtonText="Sign In"
      />
      <Navlink
        text="Dont have an account? Sign up instead"
        routeName="Signup"
      />
    </View>
  );
};

SigninScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 100
  }
});

export default SigninScreen;
