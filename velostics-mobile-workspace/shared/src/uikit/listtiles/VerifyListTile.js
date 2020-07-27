import React from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { Container } from "./VerifyListTile.styles";
import { Text } from "../text/Text";
import { Row } from "../layouts/layout";
import TextInput from "../TextInput/TextInput";
import ImageUpload from "../datadisplay/ImageUpload";

const VerifyListTile = ({
  heading,
  description,
  selected,
  camera,
  label,
  onPress,
  imagePlaceholder,
  index,
  camSelected,
  camNotSelected,
  tickSelected,
  tickNotSelected,
  data,
  onChange
}) => {
  const color = selected ? "darkText" : "pureGrey";
  if (data.type === "checkbox") {
    return (
      <Container>
        <Row ais fullWidth justify="space-between">
          <Text
            color={color}
            h5
            font="primarySemiBold"
            style={{ flex: 5, lineHeight: 20 }}
          >
            {index}: {description}
          </Text>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              onChange(!data.value);
            }}
          >
            <Image
              source={data.value ? tickSelected : tickNotSelected}
              style={styles.imageStyle}
            />
          </TouchableOpacity>
        </Row>
      </Container>
    );
  } else if (data.type === "textinput") {
    return (
      <Container>
        <Row ais fullWidth justify="space-between">
          <Text
            color={color}
            h5
            font="primarySemiBold"
            style={{ flex: 5, lineHeight: 20 }}
          >
            {index}: {description}
          </Text>
        </Row>
        <TextInput
          type="profile"
          placeholder={label}
          noLocale
          textType="number"
          inputProps={{
            keyboardType: "numeric",
            maxLength: 13,
            returnKeyType: "done"
          }}
          value={data.value}
          onChangeText={onChange}
        />
      </Container>
    );
  }
  return (
    <Container>
      <Row>
        <Text h3 font="primarySemiBold" style={{ flex: 5, lineHeight: 20 }}>
          {label}
        </Text>
      </Row>
      <Text
        color={color}
        h5
        font="primarySemiBold"
        style={{ flex: 5, lineHeight: 20 }}
      >
        {description}
      </Text>
      <ImageUpload
        source={data.value && { uri: data.value }}
        onUpload={({ uri }) => onChange(uri)}
      />
    </Container>
  );
};
const styles = StyleSheet.create({
  imageStyle: {
    alignSelf: "flex-end",
    height: 24,
    width: 24,
    resizeMode: "contain"
  }
});
export default VerifyListTile;
