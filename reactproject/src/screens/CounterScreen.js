import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const CounterScreen = () => {
  const [counter, setCounter] = useState(0); // here we are using the array destructring concept

  return (
    <View>
      <Button
        title="Increase"
        onPress={() => {
          setCounter(counter + 1); // counter +1 because counter++ would have incremented the value of the counter variable itslef but we dont wanna do that we are just passing the value in the setcounter after adding or sub 1 from the counter // means its the formal parameter actual value will be changed by the setcounter method itself 
        }}
      />

      <Button
        title="Decrease"
        onPress={() => {
          setCounter(counter - 1);
        }}
      />

      <Text>Cureent Count : {counter}</Text>
    </View>
  );
};

const style = StyleSheet.create({});
export default CounterScreen;