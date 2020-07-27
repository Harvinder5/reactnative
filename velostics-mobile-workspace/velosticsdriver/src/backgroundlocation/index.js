import {
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Image,
  NativeModules,
  NativeEventEmitter
} from 'react-native';

// NativeModules.LocationManager.start({
//   distanceFilter: 10,
//   timeInterval: 10,
//   debug: true,
//   title: 'Asssssss',
//   showNotification: true
// });
const eventEmitter = new NativeEventEmitter(NativeModules.LocationManager);
// eventEmitter.addListener('location', location => {
//   console.log(location); // "someValue"
// });
// setTimeout(() => {
//   console.log('stopping');
//   NativeModules.LocationManager.stop();
// }, 20000);
// const eventEmitter = new NativeEventEmitter(NativeModules.LocationManager);
const LocationManager = {
  start: NativeModules.LocationManager.start,
  stop: NativeModules.LocationManager.stop,
  getSignature: NativeModules.LocationManager.getSignature,
  startGeoFencing: NativeModules.LocationManager.startGeoFencing,
  removeGeoFenceById: NativeModules.LocationManager.removeGeoFenceById,
  removeAllGeoFences: NativeModules.LocationManager.removeAllGeoFences,
  eventEmitter: eventEmitter
};
export default LocationManager;
