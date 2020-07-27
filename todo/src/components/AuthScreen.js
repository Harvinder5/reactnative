import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  KeyboardAvoidingView
} from "react-native";
import AuthForm from "./AuthForm";
import NavLink from "./NavLink";

const AuthScreen = ({
  action,
  actionText,
  navLinkText,
  navAction,
  navigation
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../images/pin.png")}
          resizeMode="contain"
        />
        <Text style={styles.title}>Coordinated Todos</Text>
      </View>
      <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>
        <AuthForm
          navigation={navigation}
          actionText={actionText}
          action={action}
        />
      </KeyboardAvoidingView>
      <NavLink text={navLinkText} action={navAction} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3498db"
  },
  logoContainer: {
    marginTop: 50,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 150,
    height: 150
  },
  title: {
    margin: 10,
    fontSize: 16,
    color: "rgba(255,255,255,90)"
  },
  formContainer: { marginBottom: 0 }
});

export default AuthScreen;
