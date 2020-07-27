import React, { useCallback, useContext, useEffect } from "react";

import { NavBar } from "@velostics/shared";
import { inAppNotification } from "@velostics/shared/src/notifications";
import { NOTIFICATIONS_TYPE } from "@velostics/shared/src/settings";
import { handleNotificationPayload } from "@velostics/shared/src/settings/utilityFunctions";
import { observer } from "mobx-react-lite";
import OneSignal from "react-native-onesignal";

import { updateLocationHelper } from "../../../../helpers/backgroundLocationHelper";
import ShipmentService from "../../../../services/ShipmentService";
import { AuthStoreContext } from "../../../../stores/AuthStore";
import { ShipmentsContext } from "../../../../stores/ShipmentsStore";
import ShipmentList from "../../../components/Lists/ShipmentList";
import { Container } from "./Shipments.styles";
import ImageUpload from "@velostics/shared/src/uikit/datadisplay/ImageUpload";

const shipmentService = new ShipmentService();
const Shipments = () => {
  const shipmentStore = useContext(ShipmentsContext);
  const authStore = useContext(AuthStoreContext);

  const onOpened = useCallback(data => {
    /**
     * check if user came from notifications, if so set setcamefrom notification to true
     */
    // probably want to navigate to that shipment.

    /**
     * As the route for requested shipments would be invalid (TAB), handle notification will run but it will only unread the notification.
     */
    handleNotificationPayload(data, true);
  }, []);

  const onReceived = useCallback(async data => {
    const shipmentType = getValue(["payload", "additionalData", "type"], data);
    const shipmentId = getValue(
      ["payload", "additionalData", "data", "id"],
      data
    );

    if (shipmentType === NOTIFICATIONS_TYPE.shipmentRequest) {
      try {
        const data = await shipmentService.getShipmentById(shipmentId);
        shipmentStore.updateShipment(data);
      } catch (e) {
        console.log(e);
      }
    } else if (shipmentType === NOTIFICATIONS_TYPE.shipmentRemovedDriver) {
      shipmentStore.removeShipment(shipmentId);
    }

    inAppNotification(data.payload.title, data.payload.body, {
      onPress: () => handleNotificationPayload(data, true)
    });
  }, []);

  useEffect(() => {
    updateLocationHelper();
    shipmentStore.getShipments();
    authStore.getDashboardData();

    OneSignal.addEventListener("received", onReceived);
    OneSignal.addEventListener("opened", onOpened);

    return () => {
      OneSignal.removeEventListener("received");
      OneSignal.removeEventListener("opened");
    };
  }, []);

  const handleRefresh = useCallback(() => {
    shipmentStore.getShipments(true);
  }, []);

  return (
    <Container>
      <NavBar title="navigation.shipments" main />

      <ShipmentList onRetry={handleRefresh} onRefresh={handleRefresh} />
    </Container>
  );
};

export default observer(Shipments);
