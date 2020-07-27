import styled, { css } from 'styled-components/native';
import { Text } from '@velostics/shared/src/uikit/text/Text';
import { CustomIcon } from '@velostics/shared/src/utils/Expo/UI';

export const Label = styled(Text).attrs({
  semiBold: true
})`
  color: ${props => props.theme.colors.tabIcon[0]};
  margin-top: 4px;
  margin-right: -5px;
  margin-left: -5px;
  font-size: ${props => props.theme.fontSize.h6}px;
  ${({ focused }) =>
    focused &&
    css`
      color: ${props => props.theme.colors.tabIcon[1]};
    `}
`;
export const TabBarIcon = styled(CustomIcon)`
  color: ${props => props.theme.colors.tabIcon[0]};

  align-items: center;
  ${({ focused }) =>
    focused &&
    css`
      color: ${props => props.theme.colors.tabIcon[1]};
    `};
`;
