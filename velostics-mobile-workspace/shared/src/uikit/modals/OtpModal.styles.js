import styled from "styled-components/native";

export const ModalContentContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const ModalContent = styled.View`
  background-color: ${props => props.theme.colors.white[0]};
  width: 80%;
  padding: 10px;
  align-self: center;
`;
