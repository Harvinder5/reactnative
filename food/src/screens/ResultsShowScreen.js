import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import yelp from "../api/yelp";

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam("id");

  const getResults = async id => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };

  useEffect(() => {
    // use effect with empty array is used for calling a function only once // so here i am getting the data with the yelp api with axios and so on
    getResults(id);
  }, []);

  if (!result) {
    return null;
  }

  return (
    <View>
      <Text style={styles.title}>{result.name}</Text>
      <FlatList
        style={{ alignSelf: "center", marginBottom: 50 }}
        data={result.photos}
        keyExtractor={photo => photo}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return <Image style={styles.imageStyle} source={{ uri: item }} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 300,
    height: 200,
    margin: 20
  },
  title: {
    backgroundColor: "#010101",
    color: "#dfdfdf",
    alignSelf: "center",
    fontSize: 24,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 10
  }
});

export default ResultsShowScreen;
