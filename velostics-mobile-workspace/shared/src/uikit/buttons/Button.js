import React from 'react';
import { ActivityIndicator } from 'react-native';
import {
  ButtonContainer,
  TextButtonContainer,
  SmallButtonContainer
} from './Button.styles';
import { Text } from '../text/Text';

const Button = ({
  locale = true,
  title,
  disabled = false,
  loading,

  veryLight,
  textColor,
  ...rest
}) => {
  return (
    <ButtonContainer
      {...rest}
      light={disabled}
      disabled={disabled || loading}
      veryLight={veryLight}
    >
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text
          h4
          bold
          white
          locale={locale}
          id={title}
          grey={disabled}
          color={textColor ? textColor : veryLight ? 'pureGrey' : false}
        >
          {title}
        </Text>
      )}
    </ButtonContainer>
  );
};
export const SmallButton = ({ loading, title, disabled, onPress, ...rest }) => {
  return (
    <SmallButtonContainer onPress={onPress}>
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Text h5 lightPrimary bold white locale id={title} grey={disabled} />
      )}
    </SmallButtonContainer>
  );
};
export const TextButton = ({
  locale = true,
  title,
  onPress,
  size = 'h5',
  normal = false,
  children,
  center = false,
  disabled = false,
  ...rest
}) => {
  return (
    <TextButtonContainer center={center} disabled={disabled} onPress={onPress}>
      <Text
        semiBold={!normal}
        size={size}
        white
        locale={locale}
        id={title}
        lightPrimary
        {...rest}
      >
        {title}
      </Text>
    </TextButtonContainer>
  );
};
export default Button;
