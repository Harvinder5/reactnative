import React from 'react';
import { Container, Input, IconContainer } from './ChatTextInput.styles';
import { CustomIcon } from '../../utils/Expo/UI';

const ChatTextInput = ({ onPress, ...rest }) => {
  return (
    <Container>
      <Input multiline autoCorrect={false} {...rest} />
      <IconContainer onPress={onPress}>
        <CustomIcon name="send-message" lightPrimary size={23} />
      </IconContainer>
    </Container>
  );
};

export default ChatTextInput;
