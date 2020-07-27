import faker from 'faker';
import axios from 'axios';
import {
  STAGE_ENROUTE_TO_PICKUP,
  STATUS_ON_SCHEDULED
} from '@velostics/shared/src/settings';
const NOTIFICATION_URL = '/notifications';

class ShipmentService {
  getCurrent = async () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([]);
      }, 600);
    });

  getNotifications = async type => {
    try {
      const { data } = await axios.get(NOTIFICATION_URL, {
        params: { pageSize: 50 }
      });
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
  martNotificationAsync = async id => {
    try {
      const { data } = await axios.put(`${NOTIFICATION_URL}/${id}`);
      return data;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
}

export default ShipmentService;
