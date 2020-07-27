/* eslint-disable no-use-before-define */
import React from 'react';
import { StyleSheet } from 'react-native';
import call from 'react-native-phone-call';
import styled from 'styled-components/native';
import { Text } from '../text/Text';
import { CustomIcon } from '../../utils/Expo/UI';
import { ROLE_LOGISTICS_MANAGER } from '../../settings';
const Container = styled.View`
  flex-direction: row;
  padding: 14px;
  align-items: center;
  justify-content: space-between;
`;
const ContentContainer = styled.View`
  margin-left: 9px;
`;
const Right = styled.View`
  flex-direction: row;
`;
const ChatHeaderContainer = styled.View`
  height: 32px;
  width: 32px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.pureGrey[0]};
  border-radius: 16.5px;
`;
const ContactListItem = ({ data, canCall }) => {
  return (
    <Container>
      <Right>
        <ChatHeaderContainer>
          <Text white font="primarySemiBold" textTransform="uppercase">
            {data.user ? `${data.user.name[0]}${data.user.name[1]}` : ''}
          </Text>
        </ChatHeaderContainer>
        <ContentContainer>
          <Text semiBold size="h4">
            {data.user ? data.user.name : '-'}
          </Text>
          {data.user.role === ROLE_LOGISTICS_MANAGER ? (
            <Text size="h66" id="contacts.logisticsmanager" locale></Text>
          ) : null}
          <Text
            locale
            id={`contacts.${data.role}`}
            color="grey"
            size="h66"
          ></Text>
        </ContentContainer>
      </Right>
      {canCall && (
        <CustomIcon
          onPress={() => {
            call({ number: data.user ? `${data.user.phone}` : '' }).catch(
              console.error
            );
          }}
          name="phone"
          lightPrimary
          size={22}
          style={styles.icon}
        />
      )}
    </Container>
  );
};
const styles = StyleSheet.create({
  icon: {
    paddingRight: 5,
    paddingLeft: 5
  }
});
export default ContactListItem;
