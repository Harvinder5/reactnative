/**
 * ALL app-center related code should be written only here,
 * would be easy to refactor in future or if we want to change our analytics provider
 */

// import Analytics from "appcenter-analytics";
import analytics, { firebase } from "@react-native-firebase/analytics";

import { RNConfig } from "../settings/config";
import { logger } from "../settings/utilityFunctions";
import AppConfig from "../../appConfig.json";
const SHIPMENT_ACCEPT = "shipment_accept";
const SHIPMENT_REJECT = "shipment_reject";
const PROCEDURE_FILLED = "procedure_filled";
const PROCEDURE_SKIPPED = "procedure_skipped";
const LEAVE_FOR_PICKUP = "LEAVE_FOR_PICKUP";
const LOCATION_UPDATE = "LOCATION_UPDATE";
const SIGN_UP = "sign_up";
const SIGN_IN = "sign_in";
const LOGOUT = "sign_out";

export const init = async () => {
  // const enabled = await Analytics.isEnabled();
  if (
    RNConfig.TARGET_NAME.toLowerCase() === "production" ||
    RNConfig.TARGET_NAME.toLowerCase() === "staging"
  ) {
    logger("Analytics Enabled");
    // analytics.setAnalyticsCollectionEnabled(true);
    firebase.analytics().setAnalyticsCollectionEnabled(true);
  } else {
    logger("Analytics Off");
  }
  // const environments = AppConfig.driver.analytics.activeEnvironments;
  // if (enabled) {
  //   return console.log("Analytics already enabled");
  // }
  // if (environments.includes(RNConfig.TARGET_NAME.toLowerCase())) {
  //   console.log("Setting up the analytics");
  //   await Analytics.setEnabled(true);
  // } else {
  //   console.log("Analytics not set for current environment");
  // }
};
export const setUser = async user => {
  console.log(`Setting User: ${user.name}, ${user.id}`);
  await Promise.all([
    analytics().setUserId(user.id),
    analytics().setUserProperty("role", user.role)
  ]);
  return;
};
export const screenView = (screenName, options) => {
  // Analytics.trackEvent(`SCREEN: ${screenName}`, {
  //   Category: "Screen",
  //   ...options
  // });
  analytics().setCurrentScreen(screenName, screenName);
};

export const action = (action, options = {}) => {
  // Analytics.trackEvent(`ACTION: ${action}`, {
  //   Category: "Action",
  //   ...options
  // });
  console.log(`Setting action: ${action}`);
  analytics().logEvent(action, options);
};
export const reset = () => {
  analytics().resetAnalyticsData();
};
export const setLocale = locale => {
  console.log(`Setting Analytics locale to: ${locale}`);
  // Analytics.setLocale(locale);
};

/**
 * The reason behind default export is that
 * the analytics is in shared folder and is a named export in other files, that is the reason behind the default export
 */
export default {
  init,
  setUser,
  action,
  reset,
  screenView,
  SHIPMENT_ACCEPT,
  SHIPMENT_REJECT,
  PROCEDURE_FILLED,
  PROCEDURE_SKIPPED,
  LEAVE_FOR_PICKUP,
  LOCATION_UPDATE,
  SIGN_UP,
  SIGN_IN,
  LOGOUT
};
