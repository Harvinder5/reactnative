import styled, { css } from 'styled-components/native';
import hexToRgba from 'hex-to-rgba';
import { Text } from '../text/Text';

export const ChatTileContainer = styled.View`
  margin-left: 20px;
  margin-top: 10px;
  align-self: ${props => (props.received ? 'flex-start' : 'flex-end')};
  min-height: 60px;
  flex-direction: column;
  ${({ last }) =>
    last &&
    css`
      margin-bottom: 60px;
      background-color: blue;
    `}
`;
export const ChatTileHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: baseline;
  margin-right: 8%;
  margin-bottom: 5px;
  ${({ received }) =>
    received &&
    css`
      padding-right: 0px;
      padding-left: 5px;
      justify-content: space-between;
    `}
`;
export const NameTextContainer = styled.View`
  margin: 0px 5px;
`;
export const ChatHeadAvatar = styled.Image`
  height: 32px;
  width: 32px;
  border-radius: 16.5px;
`;
export const ChatTileParentContainer = styled.View``;
export const ChatTileContentContainer = styled.View`
  padding: 10px 20px;
  min-height: 50px;
  background-color: ${props =>
    props.received
      ? props.theme.colors.white[0]
      : props.theme.colors.childPrimary[1]};
  border-radius: 4px;
  border-top-right-radius: 0px;
  margin-right: 20px;
  border-width: 1px;
  border-color: ${props => hexToRgba(props.theme.colors.grey[0], 0.2)};
  ${({ received }) =>
    received &&
    css`
      margin-left: 10px;
      align-self: flex-start;
    `}
`;
export const ChatHeadAvatarContainer = styled.View`
  /* margin-top: 25px; */
`;

export const ChatText = styled(Text).attrs({ white: true })`
  line-height: 20;
`;
export const ReceivedContainer = styled.View`
  min-height: 50px;
  margin-top: 20px;
  padding: 0px 15px;
  flex-direction: row;
  align-items: center;
  ${({ last }) =>
    last &&
    css`
      margin-bottom: 60px;
    `}
`;
export const ReceivedContentContainer = styled.View`
  flex-direction: row;
`;
