import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const RoundButton = ({
  navigation,
  action,
  actionText,
  textProps,
  ...rest
}) => {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Text style={styles.buttonText} {...textProps}>
        {actionText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    height: 42,
    width: 100,
    alignItems: "center",
    borderRadius: 21,
    backgroundColor: "rgba(26, 168, 176,0.9)"
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    alignSelf: "center"
  }
});

export default RoundButton;
