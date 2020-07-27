import React from "react";
import styled from "styled-components/native";

const RedDot = styled.View`
  height: 12px;
  width: 12px;
  background-color: ${props => props.theme.colors.red[0]};
  border-radius: 6px;
  margin-right: ${props => props.marginRight || "0px"};
  margin-left: ${props => props.marginLeft || "0px"};
`;

export default RedDot;
