import React from "react";
import * as Permissions from "expo-permissions";
// import {
//   useNotificationPermission,
//   useLocationPermission
// } from "@velostics/shared/src/hooks";
import OneSignal from "react-native-onesignal";
import { Button } from "@velostics/shared";
import {
  Container,
  ButtonContainer,
  Header,
  ImageContent
} from "./components/Permissions";
import NavigationService from "@velostics/shared/src/settings/NavigationService";
import { ONE_SIGNAL_DRIVER } from "@velostics/shared/src/settings";
const NotificationPermission = () => {
  // TODO Should be dynamic on the available permissions, for example, if locaitn permission is there, no need to go to the screen.
  // hight level Implementation example below.

  // const hasNotificationPermission = useNotificationPermission(true);
  // const hasLocationPermission = useLocationPermission(false);

  // useEffect(() => {
  //   console.log(hasNotificationPermission, hasLocationPermission);
  //   Permissions.getAsync(Permissions.LOCATION);
  //   if (loading) {
  //     // It hanged ..
  //     if (!hasNotificationPermission && hasLocationPermission) {
  //       // Hanged on notification permission, but has location permision
  //       return NavigationService.navigate("App");
  //     } else if (!hasNotificationPermission && !hasLocationPermission) {
  //       // Hanged on notification permission, and doesn't have location permision
  //       return NavigationService.navigate("LocationPermission");
  //     } else if (hasNotificationPermission && hasLocationPermission) {
  //       return NavigationService.navigate("App");
  //     } else if (hasNotificationPermission && !hasLocationPermission) {
  //       return NavigationService.navigate("LocationPermission");
  //     }
  //   }
  // }, [hasNotificationPermission]);

  const setPermission = async () => {
    Permissions.askAsync(Permissions.NOTIFICATIONS);
    OneSignal.init(ONE_SIGNAL_DRIVER);

    setTimeout(() => {
      NavigationService.navigate("LocationPermission");
    }, 500);
  };
  return (
    <Container contentContainerStyle={{ flex: 1 }}>
      <Header
        title="notification.permission.title"
        description="notification.permission.description"
      />
      <ImageContent
        source={require("../../../../../assets/notificationpermission.png")}
        message="notification.permission.message"
      />
      <ButtonContainer>
        <Button
          expand
          title="notification.button"
          lightPrimary
          onPress={setPermission}
        />
      </ButtonContainer>
    </Container>
  );
};

export default NotificationPermission;
