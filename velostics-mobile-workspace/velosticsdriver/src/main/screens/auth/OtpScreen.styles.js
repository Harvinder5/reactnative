import styled from "styled-components/native";
import hexToRgba from "hex-to-rgba";
export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.primary[0]};
`;
export const OtpTextInputContainer = styled.View`
  margin-top: 20px;
  align-self: center;
  align-items: center;
`;
export const LoaderContainer = styled.View`
  position: absolute;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${props => hexToRgba(props.theme.colors.pureGrey[0], 0.2)};
`;
