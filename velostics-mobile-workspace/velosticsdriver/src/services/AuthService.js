/* eslint-disable dot-notation */
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

import Config from "../../env";

/** YOU ALSO NEED TO CHANGE THIS IN OTPMODAL */
const authHeaders = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${btoa(
      "5a065ba89ba75d7c2109267369b00fa1:6d5c53332ea6ccc35fbee832e85dddfb642624445c46245ebd383487e7d58ed8"
    )}`
  }
};
class AuthService {
  loginAsync = async values => {
    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", values.username);
    formData.append("password", values.password);

    try {
      const { data } = await axios.post(
        `${Config.API_HOST}/oauth/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(
              "5a065ba89ba75d7c2109267369b00fa1:6d5c53332ea6ccc35fbee832e85dddfb642624445c46245ebd383487e7d58ed8"
            )}`
          }
        }
      );
      console.log({ data });
      return data;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };

  signupAsync = async values => {
    try {
      const { data, ...rest } = await axios.post(`/driver/sign-up`, values);
      console.log(rest);
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
  sendOtpAsync = async (phone, signature) => {
    console.log(phone);
    const formData = new URLSearchParams();
    formData.append("phone", phone);
    if (signature) {
      formData.append("signature", signature);
    }
    try {
      const { data } = await axios.post(
        `${Config.API_HOST}/oauth/otp`,
        formData,
        authHeaders
      );
      console.log(data);
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
  confirmOtpAsync = async params => {
    try {
      const formData = new URLSearchParams();
      formData.append("phone", params.phone);
      formData.append("otp", `${params.otp}`);

      const { data } = await axios.post(
        `${Config.API_HOST}/oauth/login-otp`,
        formData,
        authHeaders
      );
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };

  fetchUserAsync = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.get(`${Config.API_HOST}/oauth/me`);
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };

  setLanguageAsync = async language => {
    console.log(language);
    try {
      const { data } = await axios.patch(
        "/dashboard/users/language-preference",
        { language }
      );
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };

  updateUserAsync = async values => {
    try {
      const { data } = await axios.patch("/driver", values);
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
  getDashboardAsync = async () => {
    try {
      const { data } = await axios.get("/driver/dashboard");
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };

  sendPlayerId = async playerId => {
    console.log(playerId);
    try {
      const { data } = await axios.post("/push-notification", {
        token: `${playerId}`
        // app: APP_ROLE
      });
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
}

export default AuthService;
