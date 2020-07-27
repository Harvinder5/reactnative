import React, { useState } from "react";
import { Text, Button, View, StyleSheet, TextInput } from "react-native";

const BlogPostForm = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

  return (
    <View>
      <Text style={styles.label}>Edit Title: </Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={text => setTitle(text)}
      />

      <Text style={styles.label}>Edit Content: </Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={text => setContent(text)}
      />

      <Button title="Save Blog Post" onPress={() => onSubmit(title, content)} />
    </View>
  );
};

BlogPostForm.defaultProps = {
  //this property is for providing the initial values react is gonna check for the values if this property is available
  initialValues: {
    title: "",
    content: ""
  }
};

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    margin: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    margin: 10,
    padding: 10,
    fontSize: 18
  }
});
export default BlogPostForm;
