import React from "react";
import AuthScreen from "../components/AuthScreen";

const SignupScreen = ({ navigation }) => {
  return (
    <>
      <AuthScreen
        actionText="SIGNUP"
        navLinkText="Already have an account? Login"
        navAction="Login"
        navigation={navigation}
      />
      {/* <StatusBar
        barStyle="dark-content"
        // dark-content, light-content and default
        hidden={true}
        //To hide statusBar
        backgroundColor="#3498db"
        //Background color of statusBar
        translucent={false}
        //allowing light, but not detailed shapes
        networkActivityIndicatorVisible={true}
      /> */}
    </>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    header: null
  };
};

export default SignupScreen;
