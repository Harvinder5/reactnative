import styled, { css } from "styled-components/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { createIconSetFromFontello } from "react-native-vector-icons";
import fontelloConfig from "../../../assets/config.json";

const IconAssets = createIconSetFromFontello(fontelloConfig, "IconAssets");

export const StyledIcon = styled(MaterialIcons)`
  ${({ white }) =>
    white &&
    css`
      color: ${props => props.theme.colors.white[0]};
    `}
  ${({ lightPrimary }) =>
    lightPrimary &&
    css`
      color: ${props => props.theme.colors.primary[1]};
    `}
`;
export const StyledCustomIcon = styled(IconAssets)`
  ${({ white }) =>
    white &&
    css`
      color: ${props => props.theme.colors.white[0]};
    `}
  ${({ lightPrimary }) =>
    lightPrimary &&
    css`
      color: ${props => props.theme.colors.primary[1]};
    `}
  ${({ color }) =>
    color &&
    css`
      color: ${props => props.theme.colors[color][0]};
    `}
  ${({ center }) =>
    center &&
    css`
      align-self: center;
    `}
  ${({ margin }) =>
    margin &&
    css`
      margin: ${props => props.margin};
    `}
  ${({ circularColor }) =>
    circularColor &&
    css`
      background-color: ${props => props.theme.colors[circularColor][0]};
    `}
      
`;
