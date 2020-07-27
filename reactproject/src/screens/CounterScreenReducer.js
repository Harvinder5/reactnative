import React, { useReducer } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const reducer = (state, action) => {
  // state to be an object which will have
  // count property which is a number
  // and then action which will increment and decrement the value
  // state === {count: number}
  // action === {type: 'increment or decrement'}

  switch (action.type) {
    case "increment":
      return {...state, count:state.count + action.payload}; // state is a object so always remember you have to return a object from here
    case "decrement":
      return {...state, count:state.count - action.payload};
    default:
      return state;
  }
};

const CounterScreenReducer = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <View>
      <Button title="Increase" onPress={() => {dispatch({type:'increment',payload:1})}} />
      <Button title="Decrease" onPress={() => {dispatch({type:'decrement',payload:1})}} />
      <Text>Current Count: {state.count}</Text>
    </View>
  );
};
export default CounterScreenReducer;
