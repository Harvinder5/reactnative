import faker from "faker";
import axios from "axios";
import * as Cellular from "expo-cellular";
import * as Device from "expo-device";
import {
  STAGE_ENROUTE_TO_PICKUP,
  STATUS_ON_SCHEDULED
} from "@velostics/shared/src/settings";

import { Analytics } from "@velostics/shared";

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

class ShipmentService {
  getCurrent = async () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([]);
      }, 600);
    });

  getShipments = async () => {
    try {
      const { data } = await axios.get(`/driver/shipments`);
      return data;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
  getShipmentList = async (type, params = {}) => {
    try {
      const { data } = await axios.get(`/driver/shipments/${type}`, params);
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
  getShipmentById = async id => {
    try {
      const { data } = await axios.get(`/driver/shipments/${id}`);
      console.log({ shipmentById: data });
      return data;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
  // MUTATION
  acceptShipment = async id => {
    try {
      const { data } = await axios.put(`/driver/shipments/${id}/accept`);
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };

  rejectShipment = async (id, note) => {
    try {
      const { data } = await axios.put(`/driver/shipments/${id}/reject`, {
        cancel_reason: note
      });
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
  startTrip = async id => {
    const params = {
      stage: STAGE_ENROUTE_TO_PICKUP,
      status: STATUS_ON_SCHEDULED
    };
    try {
      const { data } = await axios.put(`/driver/shipments/${id}/track`, params);
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
  updateTrip = async (id, params) => {
    console.log(id);
    console.log(params);
    if (params.stage) {
      Analytics.action(params.stage);
    }
    if (params.status) {
      Analytics.action(params.status);
    }
    try {
      const { data } = await axios.put(`/driver/shipments/${id}/track`, params);
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
  updateLocation = async params => {
    try {
      const { data } = await axios.post(`/driver/live-location`, params, {
        timeout: 2000
      });
      console.log(data);
      if (data.length > 0) {
        const generationcode = await Cellular.getCellularGenerationAsync();
        const generation = getGenerationString(generationcode);
        const deviceInfo = {
          shipment_id: data[0].shipment_id,
          carrier: Cellular.carrier || "UNKOWN",
          brand: Device.brand || "UNKOWN",
          modal: Device.modelName || "UNKOWN",
          osName: Device.osName || "UNKOWN",
          osVersion: Device.osVersion || "UNKOWN",
          deviceName: Device.deviceName || "UNKOWN",
          generation
        };
        Analytics.action(Analytics.LOCATION_UPDATE, deviceInfo);
      }
      return data;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
  getShipmentChat = async (id, params) => {
    try {
      const { data } = await axios.get(`shipments/${id}/group-chat`, {
        params: {
          pageSize: 50
        }
      });
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
  sendShipmentChat = async (id, params) => {
    try {
      const { data } = await axios.post(`shipments/${id}/group-chat`, params);
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
}

export default ShipmentService;
