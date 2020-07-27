import { useState, useEffect, useCallback } from "react";
import * as Permissions from "expo-permissions";
import { get } from "lodash";
import { useAppStateChanged } from "./useAppStateChanged";

type LocationStatus = "unknown" | "limited" | "granted" | "denied";

const PERMISSION_CHECK_INTERVAL = 500;

const LocationStatusMap: Record<string, LocationStatus> = {
  granted: "granted",
  denied: "denied",
  whenInUse: "limited",
  always: "granted",
  none: "denied"
};

export function useLocationPermission() {
  const [locationStatus, setLocationStatus] = useState<LocationStatus>(
    "unknown"
  );

  const appStateChanged = useAppStateChanged();

  const getOrRequestPermission = useCallback(() => {
    let internalStatus = "denied";

    const handlePermission = ({ status, permissions }) => {
      const scope: LocationStatus = get(permissions, "location.ios.scope");
      const newStatus = get(LocationStatusMap, scope || status, "denied");

      if (newStatus !== "denied") {
        internalStatus = newStatus;
        setLocationStatus(newStatus);
      }
    };

    Permissions.getAsync(Permissions.LOCATION).then(handlePermission, () => {
      internalStatus = "denied";
    });

    const interval = setTimeout(() => {
      if (internalStatus === "denied") {
        Permissions.askAsync(Permissions.LOCATION).then(
          handlePermission,
          () => {
            setLocationStatus("denied");
          }
        );
      }
    }, PERMISSION_CHECK_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (locationStatus === "unknown" || appStateChanged === true) {
      getOrRequestPermission();
    }
  }, [locationStatus, appStateChanged]);

  return locationStatus;
}
