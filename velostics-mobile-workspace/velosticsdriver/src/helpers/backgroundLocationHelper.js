import * as Location from "expo-location";
import { Platform, NativeModules } from "react-native";
import { Permissions } from "react-native-unimodules";
import axios from "axios";
import ShipmentService from "../services/ShipmentService";
import LocationManager from "../backgroundlocation";
import Config from "../../env";
import AsyncStorage from "@react-native-community/async-storage";
import {
  stageCodes,
  statusCodes,
  NavigationService
} from "@velostics/shared/src/settings";
import { inAppNotification } from "@velostics/shared/src/notifications";
import { LocalNotificationService } from "../services/LocalNotificationService";
let location;
let locationEvent;

export const updateLocationHelper = async () => {
  LocationManager.removeAllGeoFences();

  try {
    const { data } = await axios.get("driver/active-shipments");

    /**
     *
     * Start location updates when i have a shipment.
     *
     */
    const shipperLat = getValue(["shipper", "latitude"], data);
    const shipperLng = getValue(["shipper", "longitude"], data);

    const consigneeLat = getValue(["consignee", "latitude"], data);
    const consigneeLng = getValue(["consignee", "longitude"], data);

    LocationManager.startGeoFencing({
      id: `${data.id}__shipper__inner`,
      latitude: Number(shipperLat),
      longitude: Number(shipperLng),
      radius: 200
    });
    LocationManager.startGeoFencing({
      id: `${data.id}__shipper__outer`,
      latitude: Number(shipperLat),
      longitude: Number(shipperLng),
      radius: 4828
    });
    LocationManager.startGeoFencing({
      id: `${data.id}__consignee__inner`,
      latitude: Number(consigneeLat),
      longitude: Number(consigneeLng),
      radius: 200
    });
    LocationManager.startGeoFencing({
      id: `${data.id}__consignee__outer`,
      latitude: Number(consigneeLat),
      longitude: Number(consigneeLng),
      radius: 4828
    });

    startLocationUpdates({
      notificationTitle: "Automated location and status updates"
    });

    /**
     * Else  remove any pending listeners
     */
  } catch (e) {
    removeBackgroundLocation();
    console.log(e);
  }
};
export const removeBackgroundLocation = () => {
  console.log("background-location stopping");
  LocationManager.stop();
  LocationManager.removeAllGeoFences();
  if (locationEvent) {
    try {
      locationEvent.remove();
    } catch (e) {
      console.log(e);
    }
  }
  AsyncStorage.removeItem("locationData");
};

export const startLocationUpdates = async ({
  notificationTitle = "Automated location and status updates"
}) => {
  if (locationEvent) {
    try {
      locationEvent.remove();
    } catch (e) {
      console.log(e);
    }
  }
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    return;
  }
  console.log("starting background location");
  /**
   * Start updates
   */
  LocationManager.start({
    distanceFilter: 500,
    timeInterval: 500,
    debug: Config.IS_PRODUCTION === "false",
    title: notificationTitle,
    description:
      "You are currently working on a shipment. We are providing automatic periodic updates to provide a safe and hassle-free trip."
  });

  /**
   * Register event listener for locations
   */
  locationEvent = LocationManager.eventEmitter.addListener(
    "location",
    async location => {
      console.log("background-location", location);
      // LocationManager.startGeoFencing();

      const { latitude, longitude, heading, accuracy } = location.coords;
      const { timestamp } = location;
      const locationPacket = {
        latitude,
        longitude,
        heading,
        created_at: new Date().toISOString(),
        accuracy
      };
      /**
       * If location data present, then append with the previous data otherwise create new and push it.
       */
      const locationData = await AsyncStorage.getItem("locationData");
      console.log(locationData);
      let parsedLocationData = [];
      if (locationData) {
        parsedLocationData = JSON.parse(locationData);
      }
      parsedLocationData.push(locationPacket);
      await AsyncStorage.setItem(
        "locationData",
        JSON.stringify(parsedLocationData)
      );
      if (parsedLocationData.length > 0) {
        sendLocation(parsedLocationData);
      }
    }
  );
};

export const updateLocationToServer = async ({ location }) => {
  const { latitude, longitude, heading, accuracy } = location.coords;
  const locationPacket = {
    latitude,
    longitude,
    heading,
    created_at: new Date().toISOString(),
    accuracy
  };
  /**
   * If location data present, then append with the previous data otherwise create new and push it.
   */
  const locationData = await AsyncStorage.getItem("locationData");
  let parsedLocationData = [];
  if (locationData) {
    parsedLocationData = JSON.parse(locationData);
  }
  parsedLocationData.push(locationPacket);
  await AsyncStorage.setItem(
    "locationData",
    JSON.stringify(parsedLocationData)
  );
  if (parsedLocationData.length > 0) {
    sendLocation(parsedLocationData);
  }
};

export const sendLocation = async locationFinalArray => {
  // console.log(locationFinalArray);
  const shipmentService = new ShipmentService();

  try {
    const data = await shipmentService.updateLocation(locationFinalArray);
    console.log(data);
    console.log("updated location");
    await AsyncStorage.setItem("locationData", JSON.stringify([]));
    if (data.notExist) {
      removeBackgroundLocation();
    }
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
export const sendCurrentLocation = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    return;
  }
  let location = await Location.getCurrentPositionAsync({});
  if (location) {
    const {
      coords: { latitude, longitude, accuracy, heading }
    } = location;
    await sendLocation([{ latitude, longitude, accuracy, heading }]);
    return;
  }
  return;
};

LocationManager.eventEmitter.addListener("geo-fence-enter", async data => {
  console.log("enter data");
  console.log(data);
  const shipmentService = new ShipmentService();
  const [id, type, circle] = data.id.split("__");
  console.log(id);
  console.log(type);
  console.log(circle);
  try {
    const { data } = await axios.get("driver/active-shipments");
    const stage = data.stage;

    if (stage === stageCodes.enroute_to_pickup.code && type === "shipper") {
      console.log(`reached shipper with ${circle}`);

      if (circle === "inner") {
        LocalNotificationService.sendLocalNotification(
          "Arrived at Pickup - Action Required",
          "Complete the Pickup Checklist before leaving for Dropoff",
          {
            delivery: "in-app-local",
            navigateTo: "TripScreen",
            navigateData: {
              id,
              triggerChecklist: true
            }
          }
        );
      }

      const packet = {};
      if (data.status !== statusCodes.arrived.code) {
        packet.status =
          circle === "inner"
            ? statusCodes.arrived.code
            : statusCodes.approaching.code;
      }
      if (circle === "inner") {
        packet.stage = stageCodes.loading.code;
      }
      shipmentService.updateTrip(id, packet);
    } else if (
      stage === stageCodes.enroute_to_destination.code &&
      type === "consignee"
    ) {
      console.log(`reached consignee with ${circle}`);

      if (circle === "inner") {
        LocalNotificationService.sendLocalNotification(
          "Arrived at Destination - Action Required",
          "Complete the Destination Checklist to complete shipment.",
          {
            delivery: "in-app-local",
            navigateTo: "TripScreen",
            navigateData: {
              id,
              triggerChecklist: true
            }
          }
        );
      }

      const packet = {};
      if (data.status !== statusCodes.arrived.code) {
        packet.status =
          circle === "inner"
            ? statusCodes.arrived.code
            : statusCodes.approaching.code;
      }
      if (circle === "inner") {
        packet.stage = stageCodes.unloading.code;
      }
      shipmentService.updateTrip(id, packet);
    }
  } catch (e) {
    console.log(e);
    return;
  }
});

LocationManager.eventEmitter.addListener("geo-fence-exit", async data => {
  console.log("exit data");
  console.log(data);
  const shipmentService = new ShipmentService();
  const [id, type, circle] = data.id.split("__");
  try {
    const { data } = await axios.get("driver/active-shipments");
    const stage = data.stage;

    console.log(`exit ${type} with ${circle}`);

    if (type === "consignee") {
      if (circle === "inner") {
        const unloadingProceduresComplete = data.procedures.post_loading.stages
          .flatMap(stage =>
            Object.values(stage.data).flatMap(procedure =>
              Boolean(procedure.value)
            )
          )
          .reduce((a, b) => a === true && b === true, true);

        if (unloadingProceduresComplete === true) {
          // When a user completes the unloading checklist, but forgets to mark their shipment as complete
          // We should automatically complete it for them
          if (stage === stageCodes.unloading.code) {
            shipmentService.updateTrip(id, {
              stage: stageCodes.completed.code
            });
          }
        }

        if (unloadingProceduresComplete === false) {
          // When a user doesn't complete the unloading procedures and exits the area
          if (stage !== stageCodes.completed.code) {
            LocalNotificationService.sendLocalNotification(
              "Shipment Incomplete - Mandatory Action",
              "Complete all steps and mark your shipment as complete.",
              {
                delivery: "in-app-local",
                navigateTo: "TripScreen",
                navigateData: {
                  id,
                  triggerChecklist: true
                }
              }
            );
          }
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
});
