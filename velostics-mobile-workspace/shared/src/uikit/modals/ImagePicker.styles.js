import styled from "styled-components/native";

export const ContentContainer = styled.View`
  background-color: ${props => props.theme.colors.white[0]};
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  max-width: 60%;
  align-self: center;
`;
export const ContentHeader = styled.View`
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%;
  background-color: ${props => props.theme.colors.primary[1]};
  padding: 15px 10px;
`;
export const ButtonContainer = styled.View`
  margin: 8px 0px;
  align-items: center;
`;
export const StyledActivityIndicator = styled.ActivityIndicator``;
