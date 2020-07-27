import React, { useContext, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import MapLite from "../components/MapLite";
import { Context as CRUDContext } from "../context/CRUDContext";

const ToDoListScreen = () => {
  const { state, readTodo } = useContext(CRUDContext);

  useEffect(() => {
    readTodo();
  }, []);

  return (
    <View style={styles.parent}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={state.todos}
        keyExtractor={item => item.todo}
        renderItem={item => {
          // console.log(item.item.location.latitude);
          return (
            <MapLite initialRegion={item.item.location} todo={item.item.todo} />
          );
          // return <Text>{item.item.location.latitude}</Text>;
        }}
      />
      {/* {console.log(state)} */}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    margin: 15
  }
});

export default ToDoListScreen;
