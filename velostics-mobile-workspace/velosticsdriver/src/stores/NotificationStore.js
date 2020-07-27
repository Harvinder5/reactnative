import { observable, decorate, action } from 'mobx';
import { Alert } from 'react-native';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { createContext } from 'react';
import NotificationService from '../services/NotificationService';
const REQUESTED = 'requested';
const CURRENT = 'current';
const SCHEDULED = 'scheduled';
const COMPLETED = 'completed';

class NotificationStore {
  constructor() {
    this.notificationService = new NotificationService();
  }

  notificationLoading = true;

  list = [];

  listError = false;

  getNotificationAsync = async () => {
    if (this.listError) {
      this.notificationLoading = true;
    }
    this.listError = false;
    try {
      const data = await this.notificationService.getNotifications();
      this.list = data.results;
      this.notificationLoading = false;
    } catch (e) {
      this.listError = e.message;
      console.log(e);
    }
  };
}
decorate(NotificationStore, {
  notificationLoading: observable,
  list: observable,
  listError: observable,
  getNotificationAsync: action
});

export const NotificationContext = createContext(new NotificationStore());
