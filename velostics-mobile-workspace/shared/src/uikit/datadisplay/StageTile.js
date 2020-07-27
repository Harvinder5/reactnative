import React from 'react';

import { View } from 'react-native';
import styled from 'styled-components/native';
import { Text } from '../text/Text';
import { stageCodes, statusCodes } from '../../settings/config';
import { Row } from '../layouts/layout';

const Container = styled.TouchableWithoutFeedback``;
const Dot = styled.View`
  height: 13px;
  width: 13px;
  border-radius: 100px;
  background-color: ${props => props.color || 'grey'};
  margin-right: 8px;
`;
const StageTile = ({ status, dotStatus, onPress, ...rest }) => {
  if (dotStatus) {
    return (
      <Container>
        <Row aic>
          <Dot color={getValue([dotStatus, 'color'], statusCodes)}></Dot>
          <Text
            color="pureGrey"
            h6
            locale
            id={stageCodes[status].name}
            margin="6px 0px"
            font="primarySemiBold"
          />
        </Row>
      </Container>
    );
  }
  return (
    <View onPress={onPress}>
      <Text
        h5
        locale
        id={stageCodes[status].name}
        margin="6px 0px"
        font="primarySemiBold"
        {...rest}
      />
    </View>
  );
};
export default StageTile;
