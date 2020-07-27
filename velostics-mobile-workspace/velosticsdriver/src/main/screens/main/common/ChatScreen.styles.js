import React from 'react';
import styled from 'styled-components';
import { Text } from '@velostics/shared';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background[0]};
`;
export const HeaderContainer = styled.View`
  background-color: ${props => props.theme.colors.white[0]};
  height: 65px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  shadow-color: #000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  elevation: 4;
`;
export const ChatHeadContainer = styled.View`
  flex-direction: row;
`;
export const ChatHeadAvatar = styled.Image`
  height: 32px;
  width: 32px;
  border-radius: 16.5px;
`;
export const ChatHeadContentContainer = styled.View`
  margin-left: 8px;
`;
export const ContactHead = styled.Image`
  height: 35px;
  width: 35px;
  border-radius: 17.5px;
  margin-right: -18px;
  resize-mode: contain;
`;
const RemainingContactHeadContainer = styled.View`
  height: 36px;
  width: 36px;
  border-radius: 17.5px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.white[0]};
  margin-right: -18px;
  resize-mode: contain;
  background-color: ${props => props.theme.colors.grey[1]};
  align-items: center;
  justify-content: center;
`;

export const RemainingContactHead = ({ number = 0 }) => {
  return (
    <RemainingContactHeadContainer>
      <Text color="darkText">{`+${number}`}</Text>
    </RemainingContactHeadContainer>
  );
};
