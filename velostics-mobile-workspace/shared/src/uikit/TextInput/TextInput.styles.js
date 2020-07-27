import styled, { css } from 'styled-components/native';
import hexToRgba from 'hex-to-rgba';
import { CustomIcon } from '../../utils/Expo/UI';

export const TextInputContainer = styled.View`
  width: 90%;
  align-self: center;
  ${({ marginVertical }) =>
    marginVertical &&
    css`
      margin-top: ${props => props.marginVertical}px;
      margin-bottom: ${props => props.marginVertical}px;
    `}
  padding: 5px 0px;
  padding-bottom: 20px;
`;

export const Input = styled.TextInput`
  height: 45px;
  width: 100%;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.white[0]};
  padding: 0px 10px;
`;
export const SecureTextEntryIcon = styled(CustomIcon)`
  color: ${props => props.theme.colors.primary[0]};
  position: absolute;
  right: 15px;
  top: 32px;
`;
export const SecondaryInputContainer = styled.View`
  ${({ marginVertical }) =>
    marginVertical &&
    css`
      margin-top: ${props => props.marginVertical}px;
      margin-bottom: ${props => props.marginVertical}px;
    `}
`;

export const SecondaryInput = styled.TextInput`
  height: 25px;
  width: 100%;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.white[0]};
  padding: 0px 0px;
  padding-right: 20px;
  font-size: ${props => props.theme.fontSize.h5}px;
  ${({ lightPrimary }) =>
    lightPrimary &&
    css`
      color: ${props => props.theme.colors.primary[1]};
    `}
`;
export const SecondaryInputUnderline = styled.View`
  border-width: 0.5px;
  width: 100%;
  border-color: ${props => hexToRgba(props.theme.colors.greyText[0], 0.5)};
  ${({ error }) =>
    error &&
    css`
      border-color: ${props => hexToRgba(props.theme.colors.red[0], 0.5)};
    `}
`;
export const ErrorContainer = styled.View`
  position: absolute;
  bottom: 0px;
  right: 0px;
`;
export const SecondaryErrorInfoIconContainer = styled.TouchableOpacity`
  position: absolute;
  padding: 0px 10px;
  right: 0px;
  bottom: 2px;
`;
