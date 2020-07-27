import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import MapView from "react-native-maps";
import DeleteButton from "../components/DeleteButton";

const MapLite = ({ initialRegion, todo }) => {
  return (
    <View style={styles.component}>
      <View>
        <DeleteButton />
        <View style={styles.mapBounds}>
          <Text style={styles.title}>{"ToDo At"}</Text>
          <MapView
            liteMode={true}
            style={styles.map}
            initialRegion={initialRegion}
          ></MapView>
          <View style={styles.markerFixed}>
            <Image
              style={styles.marker}
              source={require("../images/map_pin.png")}
            />
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.text}>{todo} </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 150
  },
  title: {
    height: 50,
    fontSize: 24,
    backgroundColor: "#3498db",
    textAlign: "center",
    padding: 8,
    color: "#ffffff",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  mapBounds: {
    height: 200,
    marginHorizontal: 15,
    borderColor: "#565656",
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  markerFixed: {
    left: "50%",
    position: "absolute",
    bottom: "50%",
    marginLeft: -17.5
  },
  marker: {
    display: "flex",
    height: 50,
    width: 35
  },
  text: {
    marginHorizontal: 15,
    borderColor: "#565656",
    borderWidth: 2,
    padding: 10,
    textAlignVertical: "top",
    fontSize: 18,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  component: {
    marginBottom: 15
  }
});

export default MapLite;
