import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "../text/Text";
import { CategoryHeaderContainer } from "./CategoryHeader.styles";
import { CustomIcon } from "../../utils/Expo/UI";
const CategoryHeader = ({
  title,
  textProps,
  rightIcon,
  onRightPress,
  renderRight,
  ...rest
}) => {
  const renderRightSide = () => {
    if (renderRight) {
      return renderRight();
    } else if (rightIcon) {
      return (
        <CustomIcon
          style={styles.iconStyles}
          name={rightIcon}
          lightPrimary
          onPress={onRightPress}
        />
      );
    }
    return null;
  };
  return (
    <CategoryHeaderContainer {...rest}>
      <Text color="grey" semiBold id={title} locale {...textProps} />
      {renderRightSide()}
    </CategoryHeaderContainer>
  );
};
const styles = StyleSheet.create({
  iconStyles: {
    paddingHorizontal: 10
  }
});
export default CategoryHeader;
