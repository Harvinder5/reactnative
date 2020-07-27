import { useState, useEffect } from "react";
import * as Permissions from "expo-permissions";

const STATUS_GRANTED = "granted";
const PERMISSION_CHECK_INTERVAL = 500;
var PERMISSION_INTERVAL = null;

const clear = () => {
  if (PERMISSION_INTERVAL) {
    clearInterval(PERMISSION_INTERVAL);
    PERMISSION_INTERVAL = null;
  }
};

const checkStatus = ({ status, setHasNotificationPermission }) => {
  const hasNotificationPermission = status === STATUS_GRANTED;
  if (hasNotificationPermission) clear();
  setHasNotificationPermission(hasNotificationPermission);
};

const detectNotificationPermission = async ({
  setHasNotificationPermission,
  askForPermission
}) => {
  // GET PERMISSION
  const { status: initialStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );

  if (initialStatus === STATUS_GRANTED) {
    setHasNotificationPermission(true);
  } else {
    // SET POOLING
    PERMISSION_INTERVAL = setInterval(async () => {
      const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      checkStatus({ status, setHasNotificationPermission });
    }, PERMISSION_CHECK_INTERVAL);

    // IT MIGHT NOT RESOLVE --->
    if (askForPermission) {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      checkStatus({ status, setHasNotificationPermission });
    }
  }
};

export const useNotificationPermission = (askForPermission = true) => {
  const [hasNotificationPermission, setHasNotificationPermission] = useState(
    null
  );

  useEffect(() => {
    detectNotificationPermission({
      setHasNotificationPermission,
      askForPermission
    });
    return () => clear();
  }, []);

  return hasNotificationPermission;
};
