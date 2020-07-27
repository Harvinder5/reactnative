import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import Spacer from "./Spacer";

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Spacer />
      <Spacer>
        <Text h3 style={styles.heading}>
          {headerText}
        </Text>
      </Spacer>

      <Input
        label="Email"
        value={email}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={text => {
          setEmail(text);
        }}
      />
      <Spacer />

      <Input
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        label="Password"
        value={password}
        onChangeText={setPassword}
      />

      <Spacer />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={submitButtonText}
          onPress={() => {
            onSubmit({ email, password });
          }}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    alignSelf: "center"
  },
  errorMessage: {
    alignSelf: "center",
    fontSize: 16,
    color: "red"
  }
});

export default AuthForm;
