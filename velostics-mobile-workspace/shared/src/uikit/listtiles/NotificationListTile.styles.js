import React from 'react';
import styled, { css } from 'styled-components';
import hexToRgba from 'hex-to-rgba';
import { Text } from '../text/Text';
import { CustomIcon } from '../../utils/Expo/UI';
export const Container = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 15px;
  ${({ unread }) =>
    unread &&
    css`
      background-color: ${props => props.theme.colors.background[1]};
    `}
`;
export const NotificationImage = styled.View`
  height: 45px;
  background-color: ${props => props.theme.colors.pureGrey[0]};
  width: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 22.5px;
`;

const NotificationStatusContainer = styled.View`
  background-color: ${props => props.theme.colors.childPrimary[0]};
  border-radius: 100px;
  align-self: flex-start;
  padding: 4px 10px;
  align-items: center;
  justify-content: center;
`;
export const TimeText = styled(Text)`
  color: ${props => props.theme.colors.greyText[2]};
  font-size: ${props => props.theme.fontSize.h6};
`;
export const RightIcon = styled(CustomIcon)`
  color: ${props => props.theme.colors.pureGrey[1]};
  margin-left: 16px;
`;
export const NotificationStatus = ({ title }) => {
  return (
    <NotificationStatusContainer>
      <Text white bold h6>
        {title}
      </Text>
    </NotificationStatusContainer>
  );
};
export const DescriptionText = styled(Text)`
  flex: 1;
  padding-right: 30px;
  color: ${props => props.theme.colors.greyText[2]};
  font-size: ${props => props.theme.fontSize.h4};
`;
export const ContentContainer = styled.View`
  flex: 1;

  margin-top: 4px;
  margin-left: 10px;
`;
export const ShipmentDetailContainer = styled.View`
  padding: 8px;
  max-width: 70%;
  border-radius: 5px;
  margin-top: 5px;
  border-color: ${props => hexToRgba(props.theme.colors.pureGrey[0], 1)};
  border-width: 0.5px;
`;
