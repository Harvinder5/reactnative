import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { ThemeContext } from 'styled-components';
import { showMessage, hideMessage } from 'react-native-flash-message';
import {
  TextInputContainer,
  Input,
  SecureTextEntryIcon,
  SecondaryInputContainer,
  SecondaryInput,
  SecondaryInputUnderline,
  ErrorContainer,
  SecondaryErrorInfoIconContainer
} from './TextInput.styles';
import { Text } from '../text/Text';
import { CustomIcon } from '../../utils/Expo/UI';
const onInfoPress = (error, intl) => () => {
  if (intl) {
    const message = intl.formatMessage({ id: error });
    showMessage({
      message,
      type: 'danger'
    });
  } else {
    showMessage({
      message: error,
      type: 'danger'
    });
  }
};
class AuthTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      securePassword: this.props.secureTextEntry
    };
  }

  onEyePress = () => {
    this.setState(prevState => ({
      securePassword: !prevState.securePassword
    }));
  };

  render() {
    const {
      placeholder,
      error,
      containerStyle,
      marginVertical = null,
      secureTextEntry = false,
      textType,
      innerRef,
      ...rest
    } = this.props;
    const { securePassword } = this.state;
    const additionalProps =
      textType === 'number'
        ? {
            returnKeyType: 'done',
            keyboardType: 'numeric'
          }
        : {};
    return (
      <TextInputContainer
        style={containerStyle}
        marginVertical={marginVertical}
      >
        {placeholder && <Text white locale id={placeholder} />}
        <Input
          autoCorrect={false}
          secureTextEntry={securePassword}
          {...additionalProps}
          {...rest}
          ref={innerRef}
        />
        {secureTextEntry && (
          <SecureTextEntryIcon
            onPress={this.onEyePress}
            name={securePassword ? 'eye' : 'eye-off'}
          />
        )}
        {error ? (
          <ErrorContainer>
            <Text font="primarySemiBold" lightPrimary id={error} locale />
          </ErrorContainer>
        ) : null}
      </TextInputContainer>
    );
  }
}
class SecondaryTextInput extends React.Component {
  render() {
    const {
      autoCorrect,
      placeholder,
      marginVertical = null,
      intl,
      noLocale = false,
      textType,
      error,
      ...rest
    } = this.props;
    const additionalProps =
      textType === 'number'
        ? {
            returnKeyType: 'done',
            keyboardType: 'numeric'
          }
        : {};

    return (
      <SecondaryInputContainer error={error} marginVertical={marginVertical}>
        <SecondaryInput
          error={error}
          autoCorrect={autoCorrect}
          placeholder={
            noLocale ? placeholder : intl.formatMessage({ id: placeholder })
          }
          {...additionalProps}
          {...rest}
        />
        {error ? (
          <SecondaryErrorInfoIconContainer onPress={onInfoPress(error, intl)}>
            <CustomIcon name="info-circled" color="red" />
          </SecondaryErrorInfoIconContainer>
        ) : null}
        <SecondaryInputUnderline error={error} />
      </SecondaryInputContainer>
    );
  }
}
SecondaryTextInput.defaultProps = {
  autoCorrect: false
};

const TextInput = ({ type, ...rest }) => {
  const collection = {
    auth: AuthTextInput,
    profile: SecondaryTextInput
  };
  const Component = collection[type];
  return <Component {...rest} />;
};

TextInput.defaultProps = {
  type: 'auth'
};
TextInput.propTypes = {
  type: PropTypes.oneOf(['auth', 'profile'])
};

export default injectIntl(TextInput);
