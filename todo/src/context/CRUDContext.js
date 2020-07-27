import createDataContext from "./createDataContext";
import { AsyncStorage } from "react-native";

const crudReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return { ...state, message: action.payload };
    case "clear":
      return { ...state, message: "" };
    case "read":
      // console.log("payload se  " + action.payload[0].todo);
      return { ...state, todos: action.payload };
    case "emptyWarn":
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

const addTodo = dispatch => async val => {
  try {
    // await AsyncStorage.removeItem("todos");
    const todosList = await AsyncStorage.getItem("todos");
    var todosArray = JSON.parse(todosList);
    if (!todosArray) {
      todosArray = [];
    }
    todosArray.push(val);
    await AsyncStorage.setItem("todos", JSON.stringify(todosArray));
    dispatch({ type: "add", payload: "Saved Successfully" });
  } catch (err) {
    console.log(err);
  }
};

const clearMessage = dispatch => () => {
  dispatch({ type: "clear" });
};
const readTodo = dispatch => async () => {
  var todosArray;
  try {
    const todos = await AsyncStorage.getItem("todos");
    todosArray = JSON.parse(todos);
    dispatch({ type: "read", payload: todosArray });
  } catch (err) {}
};

const emptyWarn = dispatch => () => {
  dispatch({ type: "emptyWarn", payload: "Enter Todo First" });
};
const editTodo = dispatch => () => {};
const updateTodo = dispatch => () => {};
const deleteTodo = dispatch => () => {};

export const { Provider, Context } = createDataContext(
  crudReducer,
  {
    addTodo,
    editTodo,
    updateTodo,
    deleteTodo,
    clearMessage,
    readTodo,
    emptyWarn
  },
  {}
);
