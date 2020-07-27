import React from 'react';
import PropTypes from 'prop-types';
import { AvatarContainer, AvatarImage } from './Avatar.styles';
const Avatar = ({ source, size }) => {
  return (
    <AvatarContainer size={size}>
      <AvatarImage source={source} size={size} />
    </AvatarContainer>
  );
};
Avatar.defaultProps = {
  size: 100
};
export default Avatar;
