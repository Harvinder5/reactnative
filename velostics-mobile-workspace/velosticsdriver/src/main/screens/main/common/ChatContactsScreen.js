/* eslint-disable no-use-before-define */
import React, { useContext, useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Dash from 'react-native-dash';
import { Container } from './ChatContactsScreen.styles';
import { NavBar, CustomIcon } from '@velostics/shared';
import ContactListItem from '@velostics/shared/src/uikit/listtiles/ContactListItem';
import { AuthStoreContext } from '../../../../stores/AuthStore';
import { WithLoading } from '@velostics/shared/src/uikit';
import { ShipmentsContext } from '../../../../stores/ShipmentsStore';
import ShipmentService from '../../../../services/ShipmentService';
const data = [
  { key: '1', name: 'Joseph Toth' },
  { key: '2', name: 'Stephanie Kelly' },
  { key: '3', name: 'James Plowman' },
  { key: '4', name: 'Luke Vanderhon' }
];
const ChatContacts = ({ navigation }) => {
  const authStore = useContext(AuthStoreContext);
  const shipmentStore = useContext(ShipmentsContext);
  const [loading, setLoading] = useState(true);
  const [shipment, setShipment] = useState(null);
  const data = navigation.getParam('data');
  const id = navigation.getParam('id');
  const getData = async () => {
    setLoading(true);
    const shipmentService = new ShipmentService();
    try {
      const data = await shipmentService.getShipmentById(id);
      setShipment(data);
      console.log(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    } finally {
      // TODO
    }
  };
  useEffect(() => {
    if (data) {
      setLoading(false);
    } else {
      getData();
    }
  }, []);
  const renderItem = ({ item }) => {
    return (
      <ContactListItem
        canCall={authStore.userData.id !== item.user.id}
        data={item}
      />
    );
  };
  const renderSeparator = () => {
    return (
      <Dash
        style={styles.itemSeparator}
        dashThickness={0.5}
        dashColor="#b2b2b2"
        dashGap={0}
      />
    );
  };
  return (
    <Container>
      <NavBar
        title="chatcontacts.title"
        rightText={data ? false : 'chat.goto'}
        onRightPress={() =>
          navigation.navigate('TripScreen', {
            id: id
          })
        }
      />
      <WithLoading loading={loading} onRetry={getData}>
        <FlatList
          keyExtractor={item => item.id}
          data={
            getValue(['collaborators'], data) ||
            getValue(['collaborators'], shipment)
          }
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparator}
        />
      </WithLoading>
    </Container>
  );
};
const styles = StyleSheet.create({
  itemSeparator: {
    width: '100%',
    alignSelf: 'center'
  }
});
export default ChatContacts;
