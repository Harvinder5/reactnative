import React from "react";
import Dash from "react-native-dash";
import PropTypes from "prop-types";
import hexToRgba from "hex-to-rgba";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { CustomIcon } from "../../utils/Expo/UI";
import { Text } from "../text/Text";
const Row = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
const Left = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Content = styled.View`
  margin-left: 7px;
  max-width: 85%;
`;
const Container = styled.TouchableOpacity``;
const MessagesInfoTile = ({ title, description, onPress }) => {
  return (
    <Container activeOpacity={0.8} onPress={onPress}>
      <Dash
        style={styles.dashStyle}
        dashThickness={1}
        dashGap={0}
        dashColor={hexToRgba("#b2b2b2", 0.5)}
      />
      <Row>
        <Left>
          <CustomIcon size={25} name="message" color="pureGrey" />
          <Content>
            <Text size="h5" font="primarySemiBold">
              {title}
            </Text>
            <Text margin="3px 0px 0px 0px" color="pureGrey" size="h6">
              {description}
            </Text>
          </Content>
        </Left>
        <CustomIcon name="right-open" color="pureGrey" size={20} />
      </Row>
    </Container>
  );
};
MessagesInfoTile.defaultProps = {
  onPress: () => {}
};
MessagesInfoTile.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onPress: PropTypes.func
};
const styles = StyleSheet.create({
  dashStyle: {
    width: "100%",
    height: 1,
    marginTop: 20,
    marginBottom: 12
  }
});
export default MessagesInfoTile;
