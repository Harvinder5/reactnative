import "../_mockLocation";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView, withNavigationFocus } from "react-navigation";

import Map from "../components/Map";
import { Context as locationContext } from "../context/LocationContext";

import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";

const TrackCreateScreen = ({ isFocused }) => {
  const { state, addLocation } = useContext(locationContext);
  const [err] = useLocation(isFocused, location => {
    addLocation(location, state.recording);
  }); // here that callback is being getting passed and we are sending that location to the location context so that we can add the location in there  and location is the arguments that was wrapped in it

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2 style={styles.heading}>
        Create a Track
      </Text>
      <Map />
      {err ? <Text>Please enable location service</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    alignSelf: "center"
  }
});

export default withNavigationFocus(TrackCreateScreen);
