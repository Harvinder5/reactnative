import styled from 'styled-components/native';
import hexToRgba from 'hex-to-rgba';
import { Text } from '@velostics/shared/src/uikit/text/Text';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.white[0]};
`;

export const HeaderContainer = styled.View`
  border-width: 0.5px;
  height: 30px;
  padding-left: 15px;
  justify-content: center;
  border-color: ${props => hexToRgba(props.theme.colors.greyText[0], 0.5)};
  background-color: ${props => props.theme.colors.sectionBackground[0]};
`;
export const HeaderText = styled(Text)`
  color: ${props => props.theme.colors.greyText[2]};
  font-size: ${props => props.theme.fontSize.h4};
  font-weight: 500;
`;
