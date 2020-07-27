import styled, { css } from 'styled-components/native';
import { Text } from '@velostics/shared/src/uikit/text/Text';

export const Container = styled.View`
  background-color: ${props => props.theme.colors.background[0]};
  flex: 1;
`;
export const VersionNumber = styled.Text`
  position: absolute;
  z-index: 3;
  elevation: 3;
  right: 15;
  top: 35;
  color: white;
`;
export const Header = styled.ImageBackground`
  height: 140px;
  background-color: ${props => props.theme.colors.primary[0]};
`;
export const RequestedTripsContainer = styled.View`
  margin-top: 25px;
  align-self: center;
  width: 90%;
  margin-bottom: 5px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: center;
`;
export const HeaderText = styled(Text)`
  color: ${props => props.theme.colors.white[0]};
  align-self: center;
  font-size: ${props => props.theme.fontSize.h3};
  font-family: SF-PRO-TEXT-SEMIBOLD;
  margin-top: 46px;
`;
export const HeaderCountContainer = styled.View`
  align-items: center;
`;

export const HeaderCount = styled(Text).attrs({
  font: 'primarySemiBold'
})`
  font-size: ${props => props.theme.fontSize.h1}px;
  color: ${props => props.theme.colors.white[0]};
`;
export const HeaderTagName = styled(Text).attrs({
  font: 'primarySemiBold'
})`
  font-size: ${props => props.theme.fontSize.h6}px;
  color: ${props => props.theme.colors.white[0]};
`;
export const HeaderSpace = styled.View`
  height: 30px;
  margin: 0px 20px;
  border-color: ${props => props.theme.colors.grey[0]};
  border-width: 0.5px;
`;
export const HeaderFooter = styled.View`
  flex-direction: row;
  margin-top: 12px;
  justify-content: center;
  align-items: center;
`;
export const ShipmentsTabContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 56px;
  shadow-color: #000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  elevation: 4;
  background-color: ${props => props.theme.colors.white[0]};
`;
export const ShipmentTabTileContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  border-width: 0px;
  border-bottom-width: 4px;
  border-color: ${props => props.theme.colors.white[0]};
  border-bottom-color: ${props =>
    props.selected
      ? props.theme.colors.childPrimary[1]
      : props.theme.colors.white[0]};
  border-bottom-right-radius: 0px;
  height: 100%;
  flex: 1;
`;
export const UnderLine = styled.View`
  width: 100%;
  height: 2px;
  background-color: ${props => props.theme.colors.white[0]};
  ${({ selected }) =>
    selected &&
    css`
      background-color: ${props => props.theme.colors.primary[1]};
    `}
`;
export const ShipmentTabNumber = styled.View`
  position: absolute;
  right: 2;
  top: ${props => props.top || 2}px;

  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.red[0]};
  border-radius: 8px;
  height: 17px;
  width: 17px;
  font-size: 10px;
  padding: 0px;
`;
