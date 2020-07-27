import React, { useState, useContext, useEffect } from "react";
import { Text, View, Image, StyleSheet, TextInput } from "react-native";
import RoundButton from "../components/RoundButton";
import Spacer from "../components/Spacer";
import MapView from "react-native-maps";

import { Context as CRUDContext } from "../context/CRUDContext";

const ToDoScreen = ({ navigation }) => {
  const { state, addTodo, clearMessage, emptyWarn } = useContext(CRUDContext);
  const [todo, setTodo] = useState("");
  const [location, setLocation] = useState(null);

  useEffect(() => {
    setLocation({
      latitude: 32.654539664686766,
      latitudeDelta: 42.47540640035361,
      longitude: 101.27149941399693,
      longitudeDelta: 114.60937466472387
    });
  }, []);

  return (
    <View style={styles.parentStyle}>
      <View style={styles.mapBounds}>
        <Text style={styles.text}>
          {!state.message ? "ADD TODO" : state.message}
        </Text>
        <MapView
          style={styles.map}
          initialRegion={location}
          onRegionChangeComplete={coords => {
            setLocation(coords);
          }}
        ></MapView>
        <View style={styles.markerFixed}>
          <Image
            style={styles.marker}
            source={require("../images/map_pin.png")}
          />
        </View>
      </View>

      <View>
        <TextInput
          placeholder="Add Todo Here"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={true}
          multiline={true}
          autoFocus={true}
          numberOfLines={2}
          value={todo}
          onChangeText={text => {
            setTodo(text);

            text ? clearMessage() : null;
          }}
        />
      </View>
      <View style={styles.buttonsParent}>
        <RoundButton
          actionText="CLEAR"
          onPress={() => {
            clearMessage();
            setTodo("");
          }}
        />
        <Spacer />
        <RoundButton
          actionText="SAVE"
          onPress={() => {
            {
              todo ? addTodo({ location, todo }) : emptyWarn();
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 150
  },
  text: {
    height: 50,
    fontSize: 24,
    backgroundColor: "#3498db",
    textAlign: "center",
    padding: 8,
    color: "#ffffff",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  parentStyle: {
    marginTop: 50
  },
  input: {
    marginHorizontal: 15,
    borderColor: "#565656",
    borderWidth: 2,
    padding: 10,
    maxHeight: 60,
    textAlignVertical: "top",
    fontSize: 18,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },

  edit: {
    width: 250,
    height: 50,
    marginHorizontal: 15,
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    textAlignVertical: "top",
    fontSize: 18,
    alignSelf: "flex-end"
  },
  buttonsParent: {
    flexDirection: "row",
    alignSelf: "center",
    display: "flex",
    marginTop: 20
  },
  buttons: {
    margin: 10
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
  }
});

export default ToDoScreen;
