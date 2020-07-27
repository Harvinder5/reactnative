import styled from 'styled-components/native';
import hexToRgba from 'hex-to-rgba';
import ProgressiveImage from '../datadisplay/ProgressiveImage';

export const Container = styled.View`
  width: 97%;
  border-radius: 5px;
  align-self: center;
  background-color: white;
  shadow-color: #000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.1;
  shadow-radius: 1px;
  border-width: 0.5px;
  border-color: ${props => hexToRgba(props.theme.colors.greyText[0], 0.2)};
  elevation: 4;
  margin-bottom: 5px;
  padding: 15px 15px;
`;
export const StyledImage = styled(ProgressiveImage)`
  height: 105px;
  width: 105px;
`;
