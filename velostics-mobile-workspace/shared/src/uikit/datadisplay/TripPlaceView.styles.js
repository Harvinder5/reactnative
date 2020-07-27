import styled, { css } from "styled-components/native";
import { Text } from "../text/Text";

export const Container = styled.View`
  padding: 1px;
  flex: 1;
`;
export const PlaceNameText = styled(Text)`
  font-size: ${props => props.theme.fontSize.h3};
  font-family: SF-PRO-TEXT-SEMIBOLD;
  color: ${props => props.theme.colors.darkText[0]};
  ${({ arrived }) =>
    arrived &&
    css`
      color: ${props => props.theme.colors.grey[0]};
    `}
`;
export const DescriptionText = styled(Text)`
  font-size: ${props => props.theme.fontSize.h6};
  font-weight: 500;
  color: ${props => props.theme.colors.grey[0]};
`;
export const DetailText = styled(Text)`
  max-width: 85%;
`;
export const DirectionIconContainer = styled.TouchableOpacity`
  position: absolute;
  top: 10;
  right: 0;
  padding: 8px;
`;
