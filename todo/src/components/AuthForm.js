import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  KeyboardAvoidingView
} from "react-native";
import RoundButton from "./RoundButton";

const AuthForm = ({ navigation, action, actionText }) => {
  console.log(actionText);
  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="username or email"
          returnKeyType="next"
          keyboardType="email-address"
          // selectionColor="#ffffff"
        />

        <TextInput
          style={styles.input}
          placeholder="password"
          returnKeyType="go"
          secureTextEntry={true}
        />
      </View>
      <RoundButton
        navigation={navigation}
        actionText={actionText}
        action={action}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    fontSize: 16,
    height: 42,
    backgroundColor: "#3477aa",
    marginTop: 20,
    color: "#FFF",
    paddingHorizontal: 21,
    borderRadius: 21
  },
  button: {
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    height: 42,
    width: 100,
    marginBottom: 50,
    alignItems: "center",
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    alignSelf: "center"
  }
});

export default AuthForm;
