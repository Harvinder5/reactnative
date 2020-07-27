import React from "react";
import { StyleSheet } from "react-native";
import { Formik, FieldArray } from "formik";
import { Text, CustomIcon } from "@velostics/shared";
import { Card } from "@velostics/shared/src/uikit/layouts/layout";
import styled from "styled-components/native";
import hexToRgba from "hex-to-rgba";

export const Container = styled.View`
  flex: 1;
  margin-top: 45px;
  background-color: ${props => props.theme.colors.white[0]};
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  shadow-color: #000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  elevation: 4;
`;
export const HeaderContainer = styled.View`
  border-bottom-color: ${props =>
    hexToRgba(props.theme.colors.greyText[0], 0.5)};
  border-bottom-width: 0.5px;
  width: 100%;
  padding: 16px;
`;
export const HeaderContent = styled.View`
  align-self: center;
  align-items: center;
`;
export const StepsContainer = styled.View`
  padding: 20px;
`;
