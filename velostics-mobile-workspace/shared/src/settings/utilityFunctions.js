import axios from "axios";
import { Linking } from "react-native";

import { stageCodes } from "./config";
import NavigationService from "./NavigationService";
import { inAppNotification } from "../notifications";

export const logger = logEntry => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`${new Date().toLocaleTimeString()} - ${logEntry}`);
  }
};

globalThis.logger = logger;

export const handleNotificationPayload = async (
  data,
  fromPush,
  notification_id
) => {

  if (fromPush) {
    const additionalData =
      data?.notification?.payload?.additionalData ??
      data?.payload?.additionalData;

    if (additionalData?.routeName) {
      markNotification(additionalData.notification_id);

      const currentRoute = NavigationService.getCurrentRoute();

      if (additionalData.routeName === "Tab") {
        additionalData.routeName = "TripScreen";
      }

      if (currentRoute.routeName === additionalData.routeName) {
        return NavigationService.replace(
          additionalData.routeName,
          additionalData.data
        );
      }

      return NavigationService.navigate(
        additionalData.routeName,
        additionalData.data
      );
    }
    return;
  }

  if (data.routeName) {
    markNotification(notification_id);
    const currentRoute = NavigationService.getCurrentRoute();

    if (data.routeName === "Tab") {
      data.routeName = "TripScreen";
    }

    if (currentRoute.routeName === data.routeName) {
      return NavigationService.replace(data.routeName, data.data);
    }

    NavigationService.navigate(data.routeName, data.data);
  }
};

const markNotification = async id => {
  try {
    const { data } = await axios.put(`notifications/${id}`);
    console.log(data);
    console.log("unread");
  } catch (e) {
    console.log(e);
  }
};

export const handlePrivacyPolicyClick = () => {
  Linking.openURL("https://www.velostics.com/privacy-policy");
};

export const shouldOpenChecklist = shipment => {
  if (
    (shipment.stage === stageCodes.unloading.code &&
      shipment.procedure_status === "post_loading" &&
      shipment.procedures) ||
    (shipment.stage === stageCodes.loading.code &&
      shipment.procedure_status === "pre_loading" &&
      shipment.procedures)
  ) {
    return true;
  }
  return false;
};
