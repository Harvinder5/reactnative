import { Dimensions } from 'react-native';
import styled from 'styled-components';
import hexToRgba from 'hex-to-rgba';

const { width } = Dimensions.get('screen');

export const Container = styled.View`
  align-self: center;
`;
export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#8f8d95'
})`
  background-color: ${props => props.theme.colors.white[0]};
  width: ${(80 / 100) * width};
  border-radius: 100px;
  padding: 0px 15px;
  padding-right: 45px;
  padding-top: 10px;
  height: 40px;
  border-width: 0.5px;
  border-color: ${props => hexToRgba(props.theme.colors.grey[0], 0.2)};
  text-align-vertical: top;
`;
export const IconContainer = styled.TouchableOpacity`
  position: absolute;
  padding: 0px 10px;
  right: 10px;
  top: 8px;
`;
