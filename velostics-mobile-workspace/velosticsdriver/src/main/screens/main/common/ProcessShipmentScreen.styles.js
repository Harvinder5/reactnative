import styled from 'styled-components/native';
import { Text } from '@velostics/shared/src/uikit/text/Text';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background[0]};
`;
export const HeaderText = styled(Text).attrs({
  semiBold: true
})`
  font-size: ${props => props.theme.fontSize.h22}px;
  color: ${props => props.theme.colors.childPrimary[0]};
  width: 93%;
  align-self: center;
  margin-top: 25px;
  margin-bottom: 10px;
`;
