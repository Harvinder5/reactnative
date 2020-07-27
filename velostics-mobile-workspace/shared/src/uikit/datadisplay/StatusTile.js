import React from "react";

import styled from "styled-components/native";
import { Text } from "../text/Text";
import { statusCodes } from "../../settings/config";

const Container = styled.TouchableOpacity`
  background-color: ${props => props.color || "white"};
  align-self: flex-start;
  padding: 4.5px 12px;
  border-radius: 100px;
`;

const StatusTile = ({ status, onPress, ...rest }) => {
  return (
    <Container
      disabled={!onPress}
      onPress={onPress}
      color={statusCodes[status].color}
      {...rest}
    >
      <Text
        size="h66"
        white
        locale
        id={statusCodes[status].name}
        font="primaryHeavy"
        spacing={0.7}
      />
    </Container>
  );
};
export default StatusTile;
