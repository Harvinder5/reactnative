/* eslint-disable no-use-before-define */
import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { FlatList, StyleSheet, ScrollView } from "react-native";
import Dash from "react-native-dash";
import isSameDay from "date-fns/is_same_day";
import {
  Container,
  HeaderContainer,
  HeaderText
} from "./MessagesScreen.styles";
import NavBar from "@velostics/shared/src/uikit/navbar/NavBar";
import { NotificationContext } from "../../../../stores/NotificationStore";
import {
  WithLoading,
  Card,
  NotificationListTile
} from "@velostics/shared/src/uikit";
import { Text, Analytics } from "@velostics/shared";
import { NOTIFICATIONS_TYPE } from "@velostics/shared/src/settings";
import NotificationService from "../../../../services/NotificationService";
import { handleNotificationPayload } from "@velostics/shared/src/settings/utilityFunctions";
import { AuthStoreContext } from "../../../../stores/AuthStore";
import { showMessage } from "react-native-flash-message";
import { STAGE_CANCELLED } from "@velostics/shared/src/settings";
// import {} from '@velostics/sha'
const Header = ({ title }) => {
  return (
    <HeaderContainer>
      <HeaderText locale id={title} />
    </HeaderContainer>
  );
};
const renderItemSeparator = () => {
  return (
    <Dash
      style={styles.itemSeparator}
      dashThickness={0.5}
      dashColor="#b2b2b2"
      dashGap={0}
    />
  );
};
const NotificationScreen = ({ navigation }) => {
  const notificationStore = useContext(NotificationContext);
  const authStore = useContext(AuthStoreContext);

  useEffect(() => {
    notificationStore.getNotificationAsync();
  }, []);

  useEffect(() => {
    Analytics.screenView("Notifications");
    const focusListener = navigation.addListener("didFocus", () => {
      notificationStore.getNotificationAsync();
    });
    return () => {
      focusListener.remove();
    };
  }, []);

  const onNotificationPress = async item => {
    // try {
    //   const notificationService = new NotificationService();
    //   // notificationService.martNotificationAsync(item.id);
    // } catch (e) {}
    if (item.type === NOTIFICATIONS_TYPE.message) {
      navigation.navigate("Chat", {
        showGoto: true,
        id: item.shipment.id,
        shipment: item.shipment
      });
    } else if (
      (item.type === NOTIFICATIONS_TYPE.shipmentRequest ||
        NOTIFICATIONS_TYPE.shipmentAssign ||
        NOTIFICATIONS_TYPE.shipmentStatusArrived,
      NOTIFICATIONS_TYPE.shipmentCompleted ||
        NOTIFICATIONS_TYPE.shipmentStatusApproaching ||
        NOTIFICATIONS_TYPE.shipmentStatusDelayed)
    ) {
      navigation.navigate("TripScreen", {
        id: item.shipment.id
      });
    } else if (item.type === NOTIFICATIONS_TYPE.shipmentAssign) {
      navigation.navigate("TripScreen", {
        id: item.shipment.id
      });
    }
  };

  const renderNew = ({ item }) => {
    return (
      <NotificationListTile
        data={item}
        isSameDriver={
          getValue(["shipment", "driver_request", "driver", "id"], item) ===
          authStore.userData.id
        }
        onPress={() => {
          console.log(authStore.userData.id);
          if (getValue(["shipment", "stage"], item) === STAGE_CANCELLED) {
            showMessage({
              message: "This shipment is cancelled",
              type: "warning"
            });
          } else if (
            getValue(["shipment", "driver_request", "driver", "id"], item) ===
            authStore.userData.id
          ) {
            handleNotificationPayload(item.payload, false, item.id);
          } else {
            showMessage({
              message: "This shipment is not assigned to you anymore",
              type: "warning"
            });
          }
        }}
      />
    );
  };

  const newNotifications = notificationStore.list.filter(elm =>
    isSameDay(elm.created_at, new Date())
  );

  const earlierNotifications = notificationStore.list.filter(
    elm => !isSameDay(elm.created_at, new Date())
  );

  const renderContent = () => {
    if (notificationStore.list.length === 0) {
      return (
        <Card>
          <Text h2 lightPrimary center locale id="error.nonotification" />
        </Card>
      );
    }

    return (
      <>
        <FlatList
          data={newNotifications}
          renderItem={renderNew}
          ItemSeparatorComponent={renderItemSeparator}
          keyExtractor={item => item.id}
        />
        <Header title="messages.header.earlier" />
        <FlatList
          data={earlierNotifications}
          renderItem={renderNew}
          ItemSeparatorComponent={renderItemSeparator}
          keyExtractor={item => item.id}
        />
      </>
    );
  };

  return (
    <Container>
      <NavBar title="messages.title" main />

      <WithLoading
        loading={notificationStore.notificationLoading}
        error={notificationStore.listError}
        onRetry={notificationStore.getNotificationAsync}
      >
        <ScrollView>
          {newNotifications.length > 0 && (
            <Header title="messages.header.new" />
          )}
          {renderContent()}
        </ScrollView>
      </WithLoading>
    </Container>
  );
};

const styles = StyleSheet.create({
  itemSeparator: {
    width: "90%",
    alignSelf: "center"
  }
});

export default observer(NotificationScreen);
