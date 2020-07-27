import styled, { css } from "styled-components/native";

export const Center = styled.View`
  align-self: center;
`;
export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.justify || "flex-start"};
  ${({ aic }) =>
    aic &&
    css`
      align-items: center;
    `}
  ${({ ais }) =>
    ais &&
    css`
      align-items: flex-start;
    `}
  ${({ center }) =>
    center &&
    css`
      align-self: center;
    `}
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
  ${({ jsb }) =>
    jsb &&
    css`
      justify-content: space-between;
    `}
  ${({ margin }) =>
    margin &&
    css`
      margin: ${props => props.margin};
    `}
  ${({ marginVertical }) =>
    marginVertical &&
    css`
      margin-top: ${props => props.marginVertical}px;
      margin-bottom: ${props => props.marginVertical}px;
    `}
  ${({ noCenter }) =>
    noCenter &&
    css`
      align-items: flex-start;
    `}
  ${({ marginBottom }) =>
    marginBottom &&
    css`
      margin-bottom: ${props => props.marginBottom};
    `}
    
`;
export const Card = styled.View`
  border-radius: 5px;
  background-color: ${props => props.theme.colors.white[0]};
  width: 95%;
  align-self: center;
  shadow-color: #000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  elevation: 4;
  padding: 15px 20px;
  margin: 8px 0px;

  ${({ minHeight }) =>
    minHeight &&
    css`
      min-height: ${props => props.minHeight}px;
    `}
  ${({ marginVertical }) =>
    marginVertical &&
    css`
      margin-top: ${props => props.marginVertical}px;
      margin-bottom: ${props => props.marginVertical}px;
    `}
  ${({ expand }) =>
    expand &&
    css`
      flex: 1;
    `}
`;
