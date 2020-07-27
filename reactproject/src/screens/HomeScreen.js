import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const HomeScreen = ({ navigation }) => {


  

  // here i am destructring the prop and accessing the navigation property and then accessing it for the navigation() method
  // console.log(props);
  return (
    <View>
      <Text style={styles.textStyle}>HH is Here</Text>
      <Button
      style = {styles.buttonStyle}
        onPress={() => navigation.navigate("Components")}
        title="Go to Components Demo"
      />

      <Button
      style = {styles.buttonStyle}
        title="Go to List Demo"
        onPress={() => navigation.navigate("List")}
      />

      {/* <TouchableOpacity onPress ={()=>props.navigation.navigate('List')}>
    <Text> Go to list demo</Text>
    <Text> Go to list demo</Text>
    <Text> Go to list demo</Text>
    </TouchableOpacity>
 */}

      <Button
      style = {styles.buttonStyle}
        title="Go to ImageScreen"
        onPress={() => navigation.navigate("Image")}
      />

      <Button
      style={styles.buttonStyle}
        title="Go to CounterScreen"
        onPress={() => navigation.navigate("Counter")}
      />

      <Button
      title = "Go to ColorScreen"
      onPress={()=> navigation.navigate("Color")}/>
    
      <Button
      title = "Go to SquareScreen"
      onPress={()=> navigation.navigate("Square")}/>

      <Button
      title = "Go to Counter Screen Reducer"
      onPress={()=> navigation.navigate("CounterReducer")}/>

      <Button
      title = "Go to Text Screen"
      onPress={()=> navigation.navigate("TextScreen")}/>

      <Button
      title = "Go to Box Screen"
      onPress={()=> navigation.navigate("BoxScreen")}/>

      <Button
      title = "Go to Layout Screen"
      onPress={()=> navigation.navigate("LayoutScreen")}/>
      
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20
  },
  buttonStyle: {
    marginVertical: 20
  }
});

export default HomeScreen;
