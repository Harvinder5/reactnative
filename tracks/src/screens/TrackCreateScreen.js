import "../_mockLocation";
import React, { useContext, useCallback } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView, withNavigationFocus } from "react-navigation";

import Map from "../components/Map";
import { Context as locationContext } from "../context/LocationContext";

import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";
import { FontAwesome } from "@expo/vector-icons";

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { recording },
    addLocation
  } = useContext(locationContext);
  const callback = useCallback(
    location => {
      addLocation(location, recording);
    },
    [recording]
  );
  const [err] = useLocation(isFocused || recording, callback); // here that callback is being getting passed and we are sending that location to the location context so that we can add the location in there  and location is the arguments that was wrapped in it

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

TrackCreateScreen.navigationOptions = {
  title: "Add Track",
  tabBarIcon: <FontAwesome name="plus" size={20} />
};

const styles = StyleSheet.create({
  heading: {
    alignSelf: "center"
  }
});

export default withNavigationFocus(TrackCreateScreen);
