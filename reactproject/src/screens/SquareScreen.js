import React, { useReducer } from "react";
import { View, Text, StyleSheet } from "react-native";
import ColorCounter from "../components/ColorCounter";
import {ToastAndroid} from 'react-native';


const COLOR_INCREMENT = 10;

const reducer = (state, action) => {
  // we have just defined this function just outside the squarescreen function so that we can use same name variable in the function and the array that variable is state
  //state === {red:number, green:number, blue:number};
  //action === {type:'change_red' || 'change_green' ||'change_blue' payload: 15|| -15}

  switch (action.type) {
    case "change_red":
      return state.red + action.payload > 255 || state.red + action.payload < 0
        ? state
        : { ...state, red: state.red + action.payload };
    // in this line we are return{} here {} means we are making a new object then we are copying the ...state all the propeerties of state object in that then we are accessing the red property of the same ...state object which is now in new object and modifing it
    // so here no change to the original object has been made
    case "change_green":
      return state.green + action.payload > 255 ||
        state.green + action.payload < 0
        ? state
        : { ...state, green: state.green + action.payload };
    case "change_blue":
      return state.blue + action.payload > 255 || state.blue + action.payload < 0
        ? state
        : { ...state, blue: state.blue + action.payload };
    default:
      return state;
  }
};

const SquareScreen = () => {
  const [state, dispatch] = useReducer(reducer, { red: 0, green: 0, blue: 0 }); //{ red: 0, green: 0, blue: 0 } here it is the default value of the state and and and the reducer must always return the same kind of state
  const { red, green, blue } = state;
  console.log(state);

  ToastAndroid.showWithGravityAndOffset(
    `Red : ${state.red}\nGreen : ${state.green}\nBlue : ${state.blue}`,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    25,
    50,
  );

  return (
    <View>
      <ColorCounter
        onIncrease={() =>
          dispatch({ type: "change_red", payload: COLOR_INCREMENT })
        }
        onDecrease={() =>
          dispatch({ type: "change_red", payload: -1 * COLOR_INCREMENT })
        }
        color="Red"
      />
      <ColorCounter
        onIncrease={() =>
          dispatch({ type: "change_green", payload: COLOR_INCREMENT })
        }
        onDecrease={() =>
          dispatch({ type: "change_green", payload: -1 * COLOR_INCREMENT })
        }
        color="Green"
      />
      <ColorCounter
        onIncrease={() =>
          dispatch({ type: "change_blue", payload: COLOR_INCREMENT })
        }
        onDecrease={() =>
          dispatch({ type: "change_blue", payload: -1 * COLOR_INCREMENT })
        }
        color="Blue"
      />

      <View
        style={{
          height: 150,
          width: 150,
          backgroundColor: `rgb(${red},${green},${blue})`
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SquareScreen;
