import styled, { css } from 'styled-components/native';

export const CategoryHeaderContainer = styled.View`
  margin-top: 25px;
  align-self: center;
  width: 90%;
  margin-bottom: 5px;
  ${({ marginTop }) =>
    marginTop &&
    css`
      margin-top: ${props => props.marginTop};
    `}
`;
