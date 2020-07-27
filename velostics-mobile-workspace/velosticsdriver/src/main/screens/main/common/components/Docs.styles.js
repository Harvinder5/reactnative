import styled, { css } from "styled-components/native";
import hexToRgba from "hex-to-rgba";
import { Card } from "@velostics/shared/src/uikit/layouts/layout";
import ProgressiveImage from "@velostics/shared/src/uikit/datadisplay/ProgressiveImage";
import ImageUpload from "@velostics/shared/src/uikit/datadisplay/ImageUpload";

export const Container = styled(Card)`
  padding: 15px 12px;
`;
export const ImageContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;
export const DocImage = styled(ProgressiveImage)`
  resize-mode: cover;
  width: 100%;
  height: 150px;
  margin: 3px 3px;
  border-width: 0.5px;
  border-color: ${props => hexToRgba(props.theme.colors.grey[0], 0.5)};
  border-radius: 6px;
`;
export const DocUploadImage = styled(ImageUpload)`
  resize-mode: cover;
  width: 100%;
  height: 150px;
  margin: 3px 3px;
  border-width: 0.5px;
  border-color: ${props => hexToRgba(props.theme.colors.grey[0], 0.5)};
  border-radius: 6px;
`;
export const CarouselItemContainer = styled.View`
  height: 100%;
  width: 100%;
`;
export const CarouselImage = styled.Image`
  width: 100%;
  flex: 1;
  resize-mode: contain;
`;
export const ModalCloseButtonContainer = styled.TouchableOpacity`
  elevation: 10;
  z-index: 10;
  position: absolute;
  top: 20;
  right: 20;
  padding: 10px;
`;
