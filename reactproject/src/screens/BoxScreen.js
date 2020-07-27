import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const BoxScreen = ()=>{
return <View style = {styles.viewStyle}>
    <Text style ={styles.textOneStyle}>Child 1</Text>
    <Text style ={styles.textTwoStyle}>Child 2</Text>
    <Text style ={styles.textThreeStyle}>Child 3</Text>
</View>

}

const styles = StyleSheet.create({

    viewStyle :{
        borderWidth:1,
        borderColor: 'black',
        alignItems:'flex-end',
        flexDirection:'row',
        height:200,
        justifyContent:'center'
        // alignItems:"flex-end"
    },
    textOneStyle :{
        marginVertical:20,
        marginHorizontal:20,
        borderWidth :1,
        padding:5,
        borderColor : 'red',
        flex:5

    },
    textTwoStyle :{
        marginVertical:20,
        marginHorizontal:20,
        borderWidth :1,
        padding:5,
        borderColor : 'red',
        flex:2
    },
    textThreeStyle :{
        marginVertical:20,
        marginHorizontal:20,
        borderWidth :1,
        padding:5,
        borderColor : 'red',
        flex:3,
        position: 'absolute'
    }

});

export default BoxScreen;