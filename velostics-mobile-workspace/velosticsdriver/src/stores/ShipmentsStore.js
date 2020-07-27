import { observable, decorate, action } from "mobx";
import { Alert } from "react-native";
import * as Cellular from "expo-cellular";
import * as Device from "expo-device";
import { showMessage, hideMessage } from "react-native-flash-message";
import { createContext } from "react";
import ShipmentService from "../services/ShipmentService";
import {
  updateLocationHelper,
  removeBackgroundLocation,
  sendLocation,
  sendCurrentLocation
} from "../helpers/backgroundLocationHelper";
import NavigationService from "@velostics/shared/src/settings/NavigationService";
import { STAGE_COMPLETED, stageCodes } from "@velostics/shared/src/settings";
import AsyncStorage from "@react-native-community/async-storage";
import { Analytics } from "@velostics/shared";
const REQUESTED = "requested";
const CURRENT = "current";
const SCHEDULED = "scheduled";
const COMPLETED = "completed";

const tabs = [
  { title: "tabs.current", type: "current", key: "current" },
  { title: "tabs.scheduled", type: "scheduled", key: "scheduled" },
  { title: "tabs.requested", type: "requested", key: "requested" },
  { title: "tabs.completed", type: "completed", key: "completed" }
];
export const getGenerationString = code => {
  if (code === Cellular.CellularGeneration.UNKNOWN) {
    return "UNKNOWN";
  } else if (code === Cellular.CellularGeneration.CELLULAR_2G) {
    return "2g";
  } else if (code === Cellular.CellularGeneration.CELLULAR_3G) {
    return "3g";
  } else if (code === Cellular.CellularGeneration.CELLULAR_4G) {
    return "4g";
  } else {
    return "Not Found";
  }
};
class ShipmentsStore {
  constructor() {
    this.shipmentService = new ShipmentService();
  }

  // NEW FLOW --->START

  shipments = [];

  shipmentsRefreshing = false;

  shipmentsLoading = true;

  shipmentsError = null;

  shipmentDetailLoading = [];

  shipmentUpdateLoading = [];

  currentShipment = null;

  currentShipmentLoading = false;

  // NEW FLOW --->END

  current = [];

  currentLoading = true;

  currentRefreshing = false;

  scheduled = [];

  scheduledLoading = true;

  scheduledRefreshing = false;

  scheduledError = false;

  requested = [];

  requestedLoading = true;

  requestedRefreshing = false;

  requestedError = false;

  completed = [];

  completedLoading = true;

  completedRefreshing = false;

  selectedTab = 0;

  acceptLoading = [];

  rejectLoading = false;

  updateLoading = [];

  shipmentTab = {
    index: 0,
    routes: tabs
  };

  setSelectedTab = value => {
    this.selectedTab = value;
  };

  setShipmentTab = value => {
    this.shipmentTab = {
      ...this.shipmentTab,
      index: value
    };
  };
  visitShipment(shipmentId) {
    this.shipments = this.shipments.map(s => {
      if (s.id === shipmentId) {
        s.viewed = true;
      }
      return s;
    });
  }

  getShipments = async refresh => {
    this.shipmentsError = null;
    if (refresh) {
      this.shipmentsRefreshing = true;
    }
    try {
      const data = await this.shipmentService.getShipments();
      this.shipments = data.results;
      this.shipmentsLoading = false;
      this.shipmentsRefreshing = false;
    } catch (e) {
      this.shipmentsError = e.message;
    }
  };
  getCurrentAsync = async refresh => {
    try {
      if (refresh) {
        this.currentRefreshing = true;
      }
      const data = await this.shipmentService.getShipmentList(CURRENT);
      this.currentLoading = false;
      this.currentRefreshing = false;
      this.current = data.results;
    } catch (e) {
      console.log(e);
    }
  };

  getScheduledAsync = async refresh => {
    this.scheduledError = false;
    try {
      if (refresh) {
        this.scheduledRefreshing = true;
      }
      const data = await this.shipmentService.getShipmentList(SCHEDULED);
      this.scheduledLoading = false;
      this.scheduledRefreshing = false;
      this.scheduled = data.results;
    } catch (e) {
      this.scheduledError = e.message;
      console.log(e);
    }
  };

  getRequestedAsync = async refresh => {
    this.requestedError = false;
    try {
      if (refresh) {
        this.requestedRefreshing = true;
      }
      const data = await this.shipmentService.getShipmentList(REQUESTED);
      this.requestedLoading = false;
      this.requestedRefreshing = false;

      this.requested = data.results;
    } catch (e) {
      this.requestedError = e.message;
      console.log(e);
    }
  };

  getCompletedAsync = async refresh => {
    this.completedError = false;
    try {
      if (refresh) {
        this.completedRefreshing = true;
      }
      const data = await this.shipmentService.getShipmentList(COMPLETED, {
        order: "desc",
        orderBy: "shipments.completed_at"
      });
      this.completedLoading = false;
      this.completedRefreshing = false;
      this.completed = data.results;
    } catch (e) {
      this.completedError = e.message;
      console.log(e);
    }
  };

  // MUTATIONS
  setTripLoading = id => {
    this.shipmentUpdateLoading = [...this.shipmentUpdateLoading, id];
  };
  removeTripLoading = id => {
    this.shipmentUpdateLoading = this.shipmentUpdateLoading.filter(
      elm => elm !== id
    );
  };
  updateShipment = data => {
    const shipmentList = this.shipments.filter(s => s.id !== data.id);
    shipmentList.push(data);
    this.shipments = shipmentList;
  };
  removeShipment = id => {
    this.shipments = this.shipments.filter(s => s.id !== id);
  };
  acceptShipmentAsync = async (id, callback) => {
    try {
      this.setTripLoading(id);
      const data = await this.shipmentService.acceptShipment(id);
      this.updateShipment(data.data);
      Analytics.action(Analytics.SHIPMENT_ACCEPT);
      if (callback) {
        callback(data);
      }
    } catch (e) {
      showMessage({
        message: e.message,
        type: "danger"
      });
      console.log(e);
    } finally {
      this.removeTripLoading(id);
    }
  };

  rejectShipmentAsync = async (id, note, done) => {
    try {
      this.rejectLoading = true;
      const data = await this.shipmentService.rejectShipment(id, note);
      this.shipments = this.shipments.filter(s => s.id !== id);
      this.rejectLoading = false;
      Analytics.action(Analytics.SHIPMENT_REJECT);
      if (done) {
        done(data);
      }
    } catch (e) {
      showMessage({
        message: e.message,
        type: "danger"
      });
      this.rejectLoading = false;
      console.log(e);
    }
  };
  startTripAsync = async (id, callback, shouldNavigate) => {
    try {
      this.setTripLoading(id);
      const data = await this.shipmentService.startTrip(id);
      this.updateShipment(data);

      sendCurrentLocation();
      updateLocationHelper();

      const generationcode = await Cellular.getCellularGenerationAsync();
      const generation = getGenerationString(generationcode);
      const deviceInfo = {
        carrier: Cellular.carrier || "UNKOWN",
        brand: Device.brand || "UNKOWN",
        modal: Device.modelName || "UNKOWN",
        osName: Device.osName || "UNKOWN",
        osVersion: Device.osVersion || "UNKOWN",
        deviceName: Device.deviceName || "UNKOWN",
        generation
      };
      Analytics.action(Analytics.LEAVE_FOR_PICKUP, deviceInfo);
      if (callback) {
        callback(data);
      }
      if (shouldNavigate) {
        NavigationService.navigate("TripScreen", {
          stage: data.stage,
          id: data.id
        });
      }
      return data;
    } catch (e) {
      console.log(e.message);
      showMessage({
        message: e.message,
        type: "danger"
      });
    } finally {
      this.removeTripLoading(id);
    }
  };
  updateTripAsync = async (id, params, callback, shouldNavigate) => {
    try {
      this.setTripLoading(id);
      if (params.stage === STAGE_COMPLETED) {
        console.log("this");
        const locationData = await AsyncStorage.getItem("locationData");
        if (locationData) {
          try {
            const parsedLocationData = JSON.parse(locationData);
            console.log(parsedLocationData);
            if (locationData.length > 0) {
              await sendLocation(parsedLocationData);
            }
            await sendCurrentLocation();
          } catch (e) {
            showMessage({
              message: "Could not update the location",
              type: "danger"
            });
            console.log(e);
          }
        }
        console.log("done");
        removeBackgroundLocation();
      }

      const data = await this.shipmentService.updateTrip(id, params);
      this.updateShipment(data);

      if (callback) {
        callback(data);
      }
      if (shouldNavigate) {
        NavigationService.navigate("TripScreen", {
          stage: data.stage,
          id: data.id
        });
      }
    } catch (e) {
      console.log(e.message);
      showMessage({
        message: e.message,
        type: "danger"
      });
    } finally {
      this.removeTripLoading(id);
    }
  };
}
decorate(ShipmentsStore, {
  shipments: observable,
  shipmentsLoading: observable,
  shipmentDetailLoading: observable,
  shipmentsRefreshing: observable,
  shipmentUpdateLoading: observable,
  shipmentsError: observable,
  current: observable,
  currentLoading: observable,
  currentRefreshing: observable,
  scheduled: observable,
  scheduledLoading: observable,
  scheduledRefreshing: observable,
  scheduledError: observable,
  requested: observable,
  requestedLoading: observable,
  requestedRefreshing: observable,
  requestedError: observable,
  completed: observable,
  completedLoading: observable,
  completedRefreshing: observable,
  completedError: observable,
  selectedTab: observable,
  acceptLoading: observable,
  updateLoading: observable,
  rejectLoading: observable,
  setSelectedTab: action,
  getCurrentAsync: action,
  shipmentTab: observable
});

export const ShipmentsContext = createContext(new ShipmentsStore());
