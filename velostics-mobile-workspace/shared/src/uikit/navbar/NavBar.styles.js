import styled, { css } from 'styled-components/native';
import { StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';

export const BackButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  position: absolute;
  left: 5;
  padding: 10px;
`;
export const StyledSafeAreaView = styled(SafeAreaView)`
  background-color: ${props => props.theme.colors.primary[0]};
  padding-top: ${Platform.OS === 'android' ? StatusBar.currentHeight : 0};
  ${({ lightPrimary }) =>
    lightPrimary &&
    css`
      background-color: ${props => props.theme.colors.primary[1]};
    `}
  ${({ color }) =>
    color &&
    css`
      background-color: ${props => props.theme.colors[color][0]};
    `}
  ${({ white }) =>
    white &&
    css`
      background-color: ${props => props.theme.colors.white[0]};
    `}
`;
export const NavBarContainer = styled.View`
  height: ${Platform.OS === 'android' ? '40px' : '50px'};
  align-items: center;
  padding: 0px 10px;
  padding-bottom: ${Platform.OS === 'android' ? '10px' : '0px'};
  justify-content: center;
  background-color: ${props => props.theme.colors.primary[0]};
  width: 100%;
  position: relative;
  ${({ lightPrimary }) =>
    lightPrimary &&
    css`
      background-color: ${props => props.theme.colors.primary[1]};
    `}
  ${({ absolute }) =>
    absolute &&
    css`
      position: absolute;
    `}
  ${({ color }) =>
    color &&
    css`
      background-color: ${props => props.theme.colors[color][0]};
    `}
  ${({ white }) =>
    white &&
    css`
      background-color: ${props => props.theme.colors.white[0]};
      border-bottom-width: 0.5px;
      border-color: ${props => props.theme.colors.pureGrey[0]};
    `}
`;

export const Left = styled.View`
  position: absolute;
`;
export const RightContainer = styled.View`
  position: absolute;
  right: ${props => (props.secondary ? 15 : 20)};
  bottom: 15;
`;
export const LeftTextContainer = styled.View`
  position: absolute;
  left: 20;
  bottom: 15;
`;
