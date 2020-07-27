import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ToDoItem = ({
  navigation,
  todo,
  status,
  actionType,
  onDelete,
  onEdit,
  index,
  onCompleted
}) => {
  const handleDelete = () => {
    onDelete(index);
  };

  const handleEdit = myToDo => {
    onEdit(index, myToDo);
  };

  const changeStatus = () => {
    onCompleted(index);
  };

  return (
    <View style={styles.parent}>
      <Text
        style={(style = styles.todoStyle)}
        onPress={() => {
          status === "pending"
            ? navigation.navigate("ToDoScreen", {
                todo: todo,
                status: status,
                onEdit: handleEdit,
                action: actionType
              })
            : null;
        }}
      >
        {todo}
      </Text>

      <View style={styles.statusStyle}>
        <Text
          onPress={() => {
            console.log("item clicked");
            // navigation.navigate("ToDoScreen", { todo: todo, status: status });
            changeStatus();
          }}
          style={(style = styles.todoStyle)}
        >
          {status}
        </Text>
      </View>
      {status === "completed" ? (
        <TouchableOpacity style={styles.deleteStyle} onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    width: 200,
    height: 70,
    borderWidth: 1,
    margin: 10,
    borderColor: "black"
  },
  statusStyle: {
    flexDirection: "row"
  },
  buttonStyle: {
    width: 30,
    height: 30
  },
  todoStyle: {
    fontSize: 18,
    alignSelf: "flex-start"
  },
  todoStyleCompleted: {
    fontSize: 18,
    alignSelf: "flex-start"
  },
  deleteStyle: {
    alignSelf: "flex-end"
  },
  deleteText: {
    color: "red",
    fontSize: 18,
    marginEnd: 5,
    marginBottom: 5
  }
});

export default ToDoItem;
