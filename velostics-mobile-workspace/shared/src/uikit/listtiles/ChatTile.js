import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import format from 'date-fns/format';
import { Text } from '../text/Text';
import {
  ChatTileContainer,
  ChatTileContentContainer,
  ChatText,
  ReceivedContainer,
  ChatHeadAvatar,
  ChatTileHeaderContainer,
  NameTextContainer
} from './ChatTile.styles';
import { Row } from '../layouts/layout';

const ROLE_NAME = {
  'logistics-manager': 'chatrole.lm'
};
// const ChatDate
const ChatTile = ({ data, type = 'sent', user, last }) => {
  if (user === data.user.id) {
    return (
      <ChatTileContainer last={last}>
        <ChatTileHeaderContainer>
          <View />
          <Text h7 color="grey">
            {format(data.created_at, 'hh:mm A')}
          </Text>
        </ChatTileHeaderContainer>
        <ChatTileContentContainer>
          <ChatText>{data.body}</ChatText>
        </ChatTileContentContainer>
      </ChatTileContainer>
    );
  }
  return (
    <ReceivedContainer last={last}>
      <ChatHeadAvatar source={require('../../../assets/contact1.png')} />
      <View style={{ width: '100%' }}>
        <ChatTileHeaderContainer received>
          <NameTextContainer>
            <Text capitalize h4 semiBold color="darkText">
              {data.user.name}
            </Text>
            {ROLE_NAME[data.user.role] ? (
              <Text h6 locale id={ROLE_NAME[data.user.role]} color="grey" />
            ) : null}
          </NameTextContainer>
          <Text h7 color="grey" margin="0px 5px">
            {format(data.created_at, 'hh:mm A')}
          </Text>
        </ChatTileHeaderContainer>
        <ChatTileContentContainer received>
          <ChatText color="darkText">{data.body}</ChatText>
        </ChatTileContentContainer>
      </View>
    </ReceivedContainer>
  );
};
ChatTile.propTypes = {
  data: PropTypes.any.isRequired
};
export default ChatTile;
