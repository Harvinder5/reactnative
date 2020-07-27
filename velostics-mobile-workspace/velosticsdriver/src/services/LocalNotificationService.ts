import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { inAppNotification } from "@velostics/shared/src/notifications";
import { NavigationService } from "@velostics/shared/src/settings";
import { AppState } from "react-native";
import RNPushNotification, {
  PushNotificationObject,
  PushNotification
} from "react-native-push-notification";

type LocalNotificationOptions = {
  delivery?: "auto" | "in-app" | "local" | "in-app-local";
  navigateTo?: string;
  navigateData?: Record<any, any>;
} & Partial<PushNotificationObject>;

class LocalNotificationServiceBuilder {
  configured = false;

  configure() {
    if (this.configured === false) {
      RNPushNotification.configure({
        onNotification: function(notification: PushNotification) {
          console.log("NOTIFICATION:", notification);

          const decoded =
            notification?.data?.encoded &&
            JSON.parse(notification?.data?.encoded);

          if (decoded && decoded.navigateTo) {
            NavigationService.navigate(
              decoded.navigateTo,
              decoded.navigateData
            );
          }

          if (!notification.data.openedInForeground) {
            notification.finish(PushNotificationIOS.FetchResult.NoData);
          }
        }
      });

      this.configured = true;
    }
  }

  sendLocalNotification(
    title: string,
    message: string,
    {
      delivery = "auto",
      navigateTo,
      navigateData,
      ...options
    }: LocalNotificationOptions = {}
  ) {
    if (
      (delivery === "auto" && AppState.currentState === "active") ||
      delivery === "in-app" ||
      delivery === "in-app-local"
    ) {
      inAppNotification(
        title,
        message,
        navigateTo
          ? {
              onPress: () =>
                NavigationService.navigate(navigateTo, navigateData)
            }
          : undefined
      );
    }

    if (
      (delivery === "auto" && AppState.currentState !== "active") ||
      delivery === "local" ||
      delivery === "in-app-local"
    ) {
      const encoded = JSON.stringify({ navigateTo, navigateData });

      RNPushNotification.localNotification({
        title,
        message,
        userInfo: { encoded },
        ...options
      });
    }
  }
}

export const LocalNotificationService = new LocalNotificationServiceBuilder();
