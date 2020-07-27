import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const  ComponentScreen = () =>{

    const name = 'HH Singh'; 

return <View>
<Text style={styles.textStyle} >Getting started with react native</Text>
<Text>My name is {name}</Text>
</View> 
// return <Text>so is it working now</Text>;

};

const styles = StyleSheet.create({
    textStyle:{
        fontSize:45 
    },
    subHeaderStyle:{
        fontSize:20
    }
});

export default ComponentScreen;