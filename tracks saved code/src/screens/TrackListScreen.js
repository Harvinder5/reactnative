import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";

const TrackListScreen = ({ navigation }) => {
  return (
    <View>
      <Text h3>This is tracklistscreen</Text>

      <Button
        title={"go to Track Detail"}
        onPress={() => {
          navigation.navigate("TrackDetail");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TrackListScreen;
