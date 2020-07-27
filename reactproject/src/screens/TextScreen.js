import React, { useState } from "react";
import { Text, Button, View, StyleSheet, TextInput } from "react-native";

const TextScreen = () => {
  const [password, setPassword] = useState("");
  return (
    <View>
      <Text>Enter Password: </Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none" // auto capitalizaion is enabled in ios by default so disable it
        autoCorrect={false} // auto correct is enabled in ios by default it receieves a boolean value
        // value = 'Hi i am akinator'
        value={password}
        // secureTextEntry={true} // for to make it password input
        multiline={true} 
        numberOfLines={4} 
        blurOnSubmit={false} //bydefault its true it will blur the box in ios so disable it
        onChangeText={newText => {
          setPassword(newText);
        }}
      />

      <Text>My password is {password}</Text>

      {password.length >= 5 ? null : (
        <Text>Password must be 5 characters long</Text>
      )}
      {/* // inside jsx null is a valid thing to show so  */}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 15,
    borderColor: "black",
    borderWidth: 1
  }
});

export default TextScreen;
