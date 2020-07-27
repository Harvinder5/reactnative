import React from "react";
import { withTheme } from "styled-components";
import { StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import {
  NavBarContainer,
  BackButtonContainer,
  StyledSafeAreaView,
  RightContainer,
  LeftTextContainer
} from "./NavBar.styles";
import { Text } from "../text/Text";
import { Icon } from "../../utils/Expo/UI";
import { TextButton } from "../buttons/Button";

const NavBar = ({
  backText = false,
  title,
  locale,
  id,
  theme,
  noLocale,
  navigation,
  onBack,
  main = false,
  lightPrimary = false,
  color,
  white = false,
  showBackText = true,
  rightText = false,
  onRightPress = () => {},
  leftText = false,
  onLeftPress = () => {},
  renderRight = null,
  rightTextSize = "h5",
  showBackButton = true,
  titleProps = {}
}) => {
  const handleBack = () => {
    if (onBack) {
      return onBack();
    }
    navigation.pop();
  };
  return (
    <StyledSafeAreaView lightPrimary={lightPrimary} color={color} white={white}>
      <NavBarContainer lightPrimary={lightPrimary} color={color} white={white}>
        {!main && !leftText && (
          <BackButtonContainer leftSpace={!showBackText} onPress={handleBack}>
            {showBackButton ? (
              <>
                <Icon
                  name="keyboard-arrow-left"
                  size={showBackText ? 35 : 45}
                  white
                  lightPrimary={white}
                  style={styles.negativeMargin}
                />
                {showBackText && (
                  <Text
                    locale
                    id="navbar.back"
                    size="h5"
                    semiBold
                    color="white"
                    margin="0px 0px 0px 3px"
                    style={styles.negativeMargin}
                  />
                )}
              </>
            ) : null}
          </BackButtonContainer>
        )}
        {leftText ? (
          <LeftTextContainer>
            <TextButton
              title={leftText}
              color="white"
              size="h5"
              normal
              onPress={onLeftPress}
            />
          </LeftTextContainer>
        ) : null}
        {noLocale ? (
          <Text h3 white bold {...titleProps} margin="0px 60px 0px 55px">
            {title}
          </Text>
        ) : (
          <Text
            h3
            white
            bold
            locale
            id={title}
            semiBold
            {...titleProps}
            margin="0px 60px 0px 55px"
          />
        )}
        {rightText ? (
          <RightContainer secondary>
            <TextButton
              title={rightText}
              color="white"
              size={rightTextSize}
              normal
              onPress={onRightPress}
            />
          </RightContainer>
        ) : null}
        {renderRight ? <RightContainer>{renderRight()}</RightContainer> : null}
      </NavBarContainer>
    </StyledSafeAreaView>
  );
};
const styles = StyleSheet.create({
  negativeMargin: {
    marginLeft: -8
  }
});
export default withNavigation(withTheme(NavBar));
