import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

export const Container = styled.View`
  border-radius: 5px;
  background-color: ${props => props.theme.colors.white[0]};
  height: 180px;
  width: ${width > 350 ? "90%" : "100%"};
  align-self: center;
  margin: 8px 2px;
  shadow-color: #000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  elevation: 4;
`;
export const ButtonLoadingContainer = styled.View`
  width: 100%;
  margin-top: 6px;
  align-items: center;
  justify-content: center;
`;
