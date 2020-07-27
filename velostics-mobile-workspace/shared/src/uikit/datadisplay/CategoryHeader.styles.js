import styled, { css } from "styled-components/native";

export const CategoryHeaderContainer = styled.View`
  margin-top: ${props => props.marginTop || "25px"};
  padding-top: ${props => props.paddingTop || "0px"};
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
  width: 95%;
  margin-bottom: 5px;
  ${({ marginTop }) =>
    marginTop &&
    css`
      margin-top: ${props => props.marginTop};
    `}
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
  ${({ persistBackground }) =>
    persistBackground &&
    css`
      background-color: ${props => props.theme.colors.background[0]};
    `}
`;
