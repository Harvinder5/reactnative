import React, { useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { ListItem } from "react-native-elements";
import { Context as TrackContext } from "../context/TrackContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);

  console.log(state);
  return (
    <View>
      <NavigationEvents onWillFocus={fetchTracks} />
      <FlatList
        data={state}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("TrackDetail", { _id: item._id });
              }}
            >
              <ListItem chevron={true} title={item.name} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
TrackListScreen.navigationOptions = {
  title: "Tracks"
};
const styles = StyleSheet.create({});

export default TrackListScreen;
