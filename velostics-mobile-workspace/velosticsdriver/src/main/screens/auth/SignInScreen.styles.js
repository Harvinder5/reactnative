import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${props => props.theme.colors.primary[0]};
  flex: 1;
`;
export const ForgotPasswordButtonContainer = styled.TouchableOpacity`
  margin-left: 5%;
  margin-top: 10px;
`;
export const UnderLine = styled.View`
  flex: 1;
  margin: 0px 15px;
  border-width: 0.5px;
  border-color: ${props => props.theme.colors.white[0]};
`;
export const LogoContainer = styled(Animated.View)`
  margin-top: 50;
  align-items: center;
`;
