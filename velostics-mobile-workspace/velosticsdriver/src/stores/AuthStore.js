/* eslint-disable dot-notation */
import axios from "axios";
import { Platform } from "react-native";
import * as Permissions from "expo-permissions";
import { observable, decorate, action } from "mobx";
import OneSignal from "react-native-onesignal";
import { showMessage, hideMessage } from "react-native-flash-message";
import io from "socket.io-client";
import AsyncStorage from "@react-native-community/async-storage";
import * as Localization from "expo-localization";
import { createContext } from "react";
import { ROLE_LOGISTICS_MANAGER } from "../settings/constants";
import AuthService from "../services/AuthService";
import Config from "../../env";
import { removeBackgroundLocation } from "../helpers/backgroundLocationHelper";
import NavigationService from "@velostics/shared/src/settings/NavigationService";
import LocationManager from "../backgroundlocation";
import { Analytics } from "@velostics/shared";
export let dashBoardInterval;

let locale = Localization.locale;
locale = locale.includes("es") ? "es" : "en";
AsyncStorage.getItem("lang").then(language => {
  console.log(language);
  if (language) {
    locale = language;
  }
});

class AuthStore {
  constructor() {
    this.authService = new AuthService();
    OneSignal.addEventListener("ids", this.onIds);
    AsyncStorage.getItem("lang").then(language => {
      if (language) {
        this.currentLanguage = language;
      }
    });
  }

  playerId = null;

  currentLanguage = locale;

  currentMode = ROLE_LOGISTICS_MANAGER;

  authenticating = true;

  isLoggedIn = false;

  userId = null;

  loginError = "";

  loginLoading = false;

  confirmOtpLoading = false;

  sendingOtp = false;

  userData = null;

  dashboardData = {};

  socket = null;

  signupLoading = false;

  checkLanuage = async () => {
    let locale = Localization.locale;
    locale = locale.includes("es") ? "es" : "en";

    const language = await AsyncStorage.getItem("lang");

    if (language) {
      locale = language;
    }
    this.currentLanguage = locale;
  };

  changeLanguage = async language => {
    let lang = language;
    if (language) {
      lang = language;
    } else {
      lang = "en";
    }
    this.currentLanguage = lang;
    await AsyncStorage.setItem("lang", lang);
    this.authService.setLanguageAsync(this.currentLanguage);
  };

  onIds = device => {
    this.playerId = device.userId;
  };

  resetLoginError = () => {
    this.loginError = "";
  };

  sendOtp = async (phone, callback) => {
    this.loginLoading = true;
    this.sendingOtp = true;
    let signature;
    try {
      if (Platform.OS === "android") {
        signature = await LocationManager.getSignature();
      }
      const data = await this.authService.sendOtpAsync(phone, signature);
      if (callback) {
        callback();
      }
    } catch (e) {
      showMessage({
        message: e.message,
        type: "danger"
      });
    } finally {
      this.loginLoading = false;
      this.sendingOtp = false;
    }
  };

  fetchUser = async () => {
    this.authenticating = true;
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      const userData = await AsyncStorage.getItem("userData");
      this.isLoggedIn = true;
      this.userData = JSON.parse(userData);
      this.socket = io(Config.API_HOST, {
        transports: ["polling"],
        query: {
          token: token.split("Bearer ")[1]
        }
      });
      this.socket.on("connect", () => {
        console.log("socket connected");
      });
    }
    if (!token) {
      this.authenticating = false;
      return (this.isLoggedIn = false);
    }

    try {
      const data = await this.authService.fetchUserAsync();
      await AsyncStorage.setItem("userData", JSON.stringify(data));
      this.userData = data;
      this.isLoggedIn = true;
      // console.log({ userData });
      Analytics.setUser(data);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      this.authenticating = false;
    }
  };

  getDashboardData = async cb => {
    try {
      this.authService.getDashboardAsync().then(data => {
        this.dashboardData = data;
        if (cb) {
          cb(this.dashboardData);
        }
      });
      dashBoardInterval = setInterval(async () => {
        const data = await this.authService.getDashboardAsync();
        this.dashboardData = data;
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };

  updatePlayerId = async () => {
    try {
      const responseForPlayerId = await this.authService.sendPlayerId(
        this.playerId
      );
    } catch (e) {
      console.log(e);
    }
  };

  login = async data => {
    this.loginLoading = true;
    try {
      const authToken = `${data.token_type} ${data.access_token}`;
      const refreshToken = `${data.refresh_token}`;
      axios.defaults.headers.common["Authorization"] = authToken;
      await AsyncStorage.setItem("userToken", authToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      const response = await this.fetchUser();

      if (response) {
        if (data.first_time_login) {
          Analytics.action(Analytics.SIGN_UP);
          this.changeLanguage(this.currentLanguage);
        } else {
          Analytics.action(Analytics.SIGN_IN);
          this.changeLanguage(this.userData.language_preference);
        }
        // IF first time, go to permission flow.
        const hasLoggedIn = await AsyncStorage.getItem("hasLoggedIn");
        if (!hasLoggedIn) {
          this.updatePlayerId();
          return NavigationService.navigate("LocationPermission");
        }
        // for other flows, update player id and go to app.
        this.updatePlayerId();
        NavigationService.navigate("App");
      }
    } catch (e) {
      this.loginError = e.message;
      showMessage({
        message: e.message,
        type: "danger"
      });
      console.log(e);
    } finally {
      this.loginLoading = false;
    }
  };

  confirmOtp = async params => {
    this.confirmOtpLoading = true;
    try {
      const data = await this.authService.confirmOtpAsync(params);
      this.login(data);
    } catch (e) {
      showMessage({
        message: e.message,
        type: "danger"
      });
    } finally {
      this.confirmOtpLoading = false;
    }
  };

  signup = async (params, done) => {
    this.signupLoading = true;
    try {
      const { confirm_password, ...rest } = params;
      console.log(rest);
      const data = await this.authService.signupAsync(rest);
      if (done) {
        done();
      }
    } catch (e) {
      console.log(e);
      showMessage({
        message: e.message,
        type: "danger"
      });
    } finally {
      this.signupLoading = false;
    }
  };
  updateUser = async values => {
    console.log(values);
    try {
      const data = await this.authService.updateUserAsync(values);
      this.fetchUser();
      return true;
    } catch (e) {
      showMessage({
        message: e.message,
        type: "danger"
      });
      return false;
      console.log(e);
    } finally {
    }
  };

  logout = async navigation => {
    try {
      await AsyncStorage.clear();
      Analytics.action(Analytics.LOGOUT);
      Analytics.reset();
      AsyncStorage.setItem("hasLoggedIn", "true");
      clearInterval(this.dashBoardInterval);
      removeBackgroundLocation();
      // OneSignal.setSubscription(false);
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoggedIn = false;
      navigation.navigate("Auth");
    }
  };
}
decorate(AuthStore, {
  loginError: observable,
  currentMode: observable,
  userData: observable,
  loginLoading: observable,
  signupLoading: observable,
  sendingOtp: observable,
  dashboardData: observable,
  currentLanguage: observable,
  confirmOtpLoading: observable,
  isLoggedIn: observable,
  authenticating: observable,
  userId: observable,
  login: action,
  fetchUser: action,
  logout: action
});
export const AuthStoreContext = createContext(new AuthStore());
