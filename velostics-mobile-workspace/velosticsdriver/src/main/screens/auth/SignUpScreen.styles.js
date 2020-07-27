import styled from "styled-components/native";
import * as Animatable from "react-native-animatable";

export const Container = styled.View`
  background-color: ${props => props.theme.colors.primary[0]};
  flex: 1;
`;
export const LogoContainer = styled.View`
  margin-top: 10px;
  align-items: center;
`;

export const ButtonContainer = styled.View``;

export const TextInputContainer = styled(Animatable.View)`
  flex: 1;
`;
export const ProfilePictureContainer = styled.View`
  flex: 1;
  margin-top: 100px;
  align-items: center;
  justify-content: center;
`;
export const ProfileImage = styled.Image`
  border-radius: 75px;
  height: 150px;
  width: 150px;
`;
export const LicenseContainer = styled.View`
  width: 90%;
  align-self: center;
  flex-direction: row;
  align-items: center;
`;
export const LabelHeadingContainer = styled.View`
  width: 90%;
  align-self: center;
`;
export const StyledLoader = styled.ActivityIndicator`
  position: absolute;
  align-self: center;
  top: 45%;
  z-index: 2;
  elevation: 2;
`;
export const TruckPhotosContainer = styled.View`
  width: 90%;
  margin-top: 5px;
  align-self: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const TruckImage = styled.Image`
  height: 105px;
  width: 105px;
`;
export const TruckMessageContainer = styled.View`
  align-self: center;
  width: 55%;
  margin-top: 8px;
  margin-bottom: 25px;
`;

export const CenterImage = styled.Image`
  height: 100px;
  resize-mode: contain;
`;
