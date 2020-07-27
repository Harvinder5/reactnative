import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import SlidesItem from "../components/SlidesItem";
import ScreenDots from "../components/ScreenDots";

const slides = [
  {
    key: "key1",
    title: "Slide One",
    text: "First",
    image: require("../images/pin.png"),
    backgroundColor: "#59ffab",
    iconName: "airplay"
  },
  {
    key: "key2",
    title: "Slide Two",
    text: "Second",
    image: require("../images/pin.png"),
    backgroundColor: "#ffb2ab",
    iconName: "bell"
  },
  {
    key: "key3",
    title: "Slide Three",
    text: "Three",
    image: require("../images/pin.png"),
    backgroundColor: "#59b2ff",
    iconName: "award"
  },
  {
    key: "key4",
    title: "Slide Four",
    text: "Four",
    image: require("../images/pin.png"),
    backgroundColor: "#ff6655",
    iconName: "aperture"
  },
  {
    key: "key5",
    title: "Slide Five",
    text: "Five",
    image: require("../images/pin.png"),
    backgroundColor: "#66ff00",
    iconName: "archive"
  }
];

const IntroScreen = () => {
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <ScreenDots style={styles.dots} />

      <View style={styles.pager}>
        <FlatList
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={slides}
          keyExtractor={item => item.key}
          renderItem={({ item }) => {
            return (
              <SlidesItem
                title={item.title}
                text={item.text}
                backgroundColor={item.backgroundColor}
                iconName={item.iconName}
              />
            );
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  pager: {
    flex: 1,
    backgroundColor: "#5656ff"
  },
  dots: { position: "absolute", top: 50 }
});
export default IntroScreen;
