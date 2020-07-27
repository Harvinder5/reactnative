import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  return (
    <View style={styles.backgroundStyle}>
      <Feather name="search" style={styles.iconStyle} />
      <TextInput
        style={styles.inputStyle}
        placeholder="Search"
        selectionColor={"black"}
        value={term}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit} // when we will click the submit button
      />
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#f0eeee",
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 12
  },
  inputStyle: {
    flex: 1,
    fontSize: 20,
    paddingEnd: 15
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 12
  }
});

export default SearchBar;
