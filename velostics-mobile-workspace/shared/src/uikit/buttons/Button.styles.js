import styled, { css } from "styled-components/native";
import { ActivityIndicator } from "react-native";
export const ButtonContainer = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.primary[0]};
  height: 45px;
  width: ${props => (props.expand ? "100% " : "90%")};
  min-width: 109px;
  border-radius: 8px;
  max-width: 400px;
  align-self: center;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 1px 1px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  margin: 5px 0px;
  ${({ noWidth }) =>
    noWidth &&
    css`
      width: 0;
      flex: 1;
    `}
  ${({ light }) =>
    light &&
    css`
      background-color: ${props => props.theme.colors.greyText[1]};
    `}
  ${({ margin }) =>
    margin &&
    css`
      margin: ${props => props.margin};
    `}
  ${({ lightPrimary }) =>
    lightPrimary &&
    css`
      background-color: ${props => props.theme.colors.primary[1]};
    `}
  ${({ shadow }) =>
    !shadow &&
    css`
      shadow-offset: 0px 0px;
      shadow-opacity: 0;
    `}
  ${({ marginBottom }) =>
    marginBottom &&
    css`
      margin-bottom: ${props => props.marginBottom};
    `}
  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${props => props.theme.colors.greyText[1]};
    `}
  ${({ veryLight }) =>
    veryLight &&
    css`
      background-color: ${props => props.theme.colors.grey[1]};
    `}
  ${({ alignSelf }) =>
    alignSelf &&
    css`
      align-self: ${props => props.alignSelf};
    `}
`;

export const TextButtonContainer = styled.TouchableOpacity`
  ${({ center }) =>
    center &&
    css`
      align-self: center;
    `}
`;

export const SmallButtonContainer = styled.TouchableOpacity`
  width: 70px;
  background-color: ${props => props.theme.colors.white[0]};
  height: 25px;
  border-radius: 3px;
  border-color: ${props => props.theme.colors.primary[0]};
  border-width: 1px;
  align-items: center;
  justify-content: center;
`;
export const ButtonActivityIndicator = styled(ActivityIndicator)`
  color: ${props => props.theme.colors.primary[0]};
`;
