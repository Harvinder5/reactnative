import React from 'react';
import { Text } from '@velostics/shared//src/uikit/text/Text';
import { CategoryHeaderContainer } from './CategoryHeader.styles';

const CategoryHeader = ({ title, textProps, ...rest }) => {
  return (
    <CategoryHeaderContainer {...rest}>
      <Text color="grey" semiBold id={title} locale {...textProps} />
    </CategoryHeaderContainer>
  );
};
export default CategoryHeader;
