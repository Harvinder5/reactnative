import styled from 'styled-components/native';
import hexToRgba from 'hex-to-rgba';
import ProgressiveImage from '@velostics/shared/src/uikit/datadisplay/ProgressiveImage';
export const Container = styled.View`
  background-color: ${props => props.theme.colors.background[0]};
  flex: 1;
`;
export const Header = styled.ImageBackground`
  height: 140px;
  background-color: ${props => props.theme.colors.primary[0]};
`;
export const AvatarContainer = styled.View`
  align-self: center;
  margin-top: -50px;
  shadow-color: #000;
  shadow-offset: 2px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  elevation: 4;
`;

export const StatisticsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top-width: 0.3px;
  border-bottom-width: 0.3px;
  border-color: ${props => props.theme.colors.grey[0]};
  padding: 10px 0px;
`;
export const StatisticsItemContainer = styled.View`
  align-items: center;
`;
export const Separator = styled.View`
  height: 70%;
  border-width: 0.5px;
  margin: 0px 15px;
  border-color: ${props => props.theme.colors.grey[0]};
`;
export const InfoTileContainer = styled.View`
  margin: 8px 0px;
`;
export const TruckImagesContainer = styled.View`
  height: 100px;
  margin: 8px 0px;
  width: 100%;
  flex-direction: row;
`;

export const EditButtonContainer = styled.View`
  flex-direction: row;
  min-width: 150px;
  justify-content: space-between;
  align-items: center;
`;
export const TruckPhotoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;
export const TruckImage = styled(ProgressiveImage)`
  resize-mode: cover;
  width: 100%;
  height: 150px;
  margin: 3px 3px;
  border-width: 0.5px;
  border-color: ${props => hexToRgba(props.theme.colors.grey[0], 0.5)};
  border-radius: 6px;
`;
export const ProfileEditIconContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: -10px;
  right: -10px;
  background-color: ${props => props.theme.colors.white[0]};
  border-radius: 100px;
  padding: 8px;
`;
