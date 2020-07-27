import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";

import { withNavigation } from "react-navigation";
import ResultsDetail from "./ResultsDetail";

const ResultsList = ({ title, results, navigation }) => {
  if (!results.length) {
    //if results.length is 0 it will become false make it true with !

    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{title}</Text>
      {/* <Text>Results : {results.length}</Text> */}

      <FlatList
        pagingEnabled={true}
        horizontal={true}
        data={results}
        keyExtractor={result => result.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ResultsShow", { id: item.id });
              }}
            >
              <ResultsDetail result={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 5
  },
  container: {
    marginBottom: 10
  }
});
export default withNavigation(ResultsList);
