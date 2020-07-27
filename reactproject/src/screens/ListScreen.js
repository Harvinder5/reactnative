import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const ListScreen = () =>{
    // return <Text> List Screen</Text>;

    const friends = [
{name: 'friends #1',age: 20},
{name: 'friends #2',age: 21},
{name: 'friends #3',age: 22},
{name: 'friends #4',age: 23},
{name: 'friends #5',age: 24},
{name: 'friends #6',age: 25},
{name: 'friends #7',age: 26},
{name: 'friends #8',age: 27},
{name: 'friends #9',age: 29}
    ];

    return (
    <FlatList 
    // horizontal
    // showsHorizontalScrollIndicator = {false} //hide the horizontal scrollbar at the bottom
    keyExtractor={(friend)=>friend.name}
    data= {friends}
    renderItem={({item})=> { //{item} here we are using destructuring
        // element === {item : {name : 'Friend #1'}, index :0}

// console.log(friends);
        return <Text style = {styles.textStyle}>{item.name}- Age {item.age}</Text>
            }}   
    />)
 };

const styles = StyleSheet.create({

    textStyle:{
        fontSize:20,
        marginHorizontal:25,
        marginVertical:5
    }
});

export default ListScreen;