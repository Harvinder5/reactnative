import React, { useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import ToDoItem from "../components/ToDoItem";
import { FlatList } from "react-native-gesture-handler";

const HomeScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);

  const addTodo = todo => {
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const editTodo = (index, myToDo) => {
    const todosArray = [...todos];
    todosArray[index] = myToDo;
    setTodos(todosArray);

    // const tempTodos = todos;
    // tempTodos[index] = todo;
    // setTodos(tempTodos);
  };

  const deleteTodo = index => {
    const newTodos = todos.filter((_, i) => index !== i);

    // const newTodos = [...todos];
    // newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editStatus = index => {
    console.log(" i am here");
    const todosArray = [...todos];
    todosArray[index].status = "completed";
    console.log(todosArray);
    setTodos(todosArray);
  };

  return (
    <>
      <View style={styles.parentStyle}>
        {/* <Text>hi</Text> */}
        <Button
          style={styles.addButtonStyle}
          title="+"
          onPress={() =>
            /**
             * Type, which will resemble something "add"
             */
            navigation.navigate("ToDoScreen", { addTodo: addTodo })
          }
        />
      </View>
      {todos.length === 0 ? (
        <Text style={styles.emptyTextStyle}>
          No ToDo's Yet please click on + button to add ToDo
        </Text>
      ) : null}

      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.flatListStyle}
        data={todos}
        keyExtractor={(_, index) => {
          return `${index}`;
        }}
        renderItem={({ item, index }) => {
          return (
            <ToDoItem
              onDelete={deleteTodo}
              onEdit={editTodo}
              index={index}
              todo={item.todo}
              navigation={navigation}
              status={item.status === "pending" ? "pending" : "completed"}
              actionType={item.actionType}
              onCompleted={editStatus}
            />
          );
        }}
      />

      <View style={styles.todoStyle}></View>
    </>
  );
};
const styles = StyleSheet.create({
  parentStyle: {
    alignItems: "flex-end"
  },
  emptyTextStyle: {
    marginTop: 100,
    alignSelf: "center"
  },
  flatListStyle: {
    marginTop: 10,
    alignSelf: "center"
  },
  addButtonStyle: {
    width: 100,
    height: 50,
    borderRadius: 25,
    marginEnd: 10
  },
  todoStyle: {
    alignItems: "center"
  }
});

export default HomeScreen;
