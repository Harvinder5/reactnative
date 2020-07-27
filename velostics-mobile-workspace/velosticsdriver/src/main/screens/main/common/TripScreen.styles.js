import React from "react";
import styled, { css } from "styled-components/native";
import { Text } from "@velostics/shared/src/uikit/text/Text";
import { TextButton } from "@velostics/shared/src/uikit/buttons/Button";
import CategoryHeader from "../../../components/header/CategoryHeader";

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background[0]};
  padding-bottom: 55px;
`;
export const ButtonContainer = styled.View`
  margin-top: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const Footer = styled.View`
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 0px 20px 10px 20px;
  background-color: ${props => props.theme.colors.background[2]};
`;

export const StyledCategoryHeader = styled(CategoryHeader).attrs({
  textProps: {
    font: "primarySemiBold",
    spacing: 0
  }
})`
  margin-top: 10px;
`;
export const FooterScrollView = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
  horizontal: true
})`
  padding: 0px 5px;
  margin-top: 20px;
`;

export const FooterHeadingContainer = styled.View`
  margin: 0px 10px;
`;
export const UnderLine = styled.View`
  border-width: 2px;
  background-color: ${props => props.theme.colors.primary[1]};
  border-color: ${props => props.theme.colors.primary[1]};
  margin-top: 1px;
  border-radius: 2px;
`;
export const FooterContainer = styled.View`
  margin-top: 15px;
`;
export const FooterHeadingText = ({ selected, ...rest }) => {
  return (
    <FooterHeadingContainer>
      <TextButton
        color={selected ? "darkText" : "grey"}
        h4
        {...rest}
        style={{ paddingHorizontal: 5 }}
      />
      {selected && <UnderLine />}
    </FooterHeadingContainer>
  );
};
