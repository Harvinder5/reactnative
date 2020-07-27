import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  FormattedText,
  StyledNumberText,
  StyledNumberTextContainer
} from './Text.styles';

const Text = ({ capitalize, locale, as, id, children, log, ...rest }) => {
  if (locale) {
    return (
      <FormattedMessage id={id}>
        {text => (
          <FormattedText as={as} {...rest}>
            {text}
          </FormattedText>
        )}
      </FormattedMessage>
    );
  }

  return (
    <FormattedText as={as} {...rest}>
      {capitalize
        ? children
          ? children.charAt(0).toUpperCase() + children.slice(1)
          : children
        : children}
    </FormattedText>
  );
};

Text.defaultProps = {
  locale: false,
  text: '',
  children: '',
  id: '',
  capitalize: false
};
Text.propTypes = {
  locale: PropTypes.bool,
  id: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.any
  ]),
  capitalize: PropTypes.bool
};
const NumberText = ({ number, checked, ...rest }) => {
  return (
    <StyledNumberTextContainer checked={checked}>
      <StyledNumberText {...rest}>{number}</StyledNumberText>
    </StyledNumberTextContainer>
  );
};
export { Text, NumberText };

export const s = 1;
