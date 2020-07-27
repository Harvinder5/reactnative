// export const URL = 'https://dev.velostics.api-build-release.com';

export const VERSION = "v0.1.0";
const rax = require("retry-axios");
import { decode as atob, encode as btoa } from "base-64";
import NavigationService from "./NavigationService";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import Config from "react-native-config";

const interceptorId = rax.attach();

if (!global.btoa) {
  global.btoa = btoa;
}

if (!global.atob) {
  global.atob = atob;
}
const getValue = (path, object) =>
  path.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), object);
globalThis.getValue = getValue;

export const STAGE_REQUEST = "requested";
export const STAGE_SCHEDULED = "scheduled";
export const STAGE_ENROUTE_TO_PICKUP = "enroute_to_pickup";
export const STAGE_LOADING = "loading";
export const STAGE_ENROUTE_TO_DESTINATION = "enroute_to_destination";
export const STAGE_UNLOADING = "unloading";
export const STAGE_COMPLETED = "completed";
export const STAGE_CANCELLED = "cancelled";
// status
export const STATUS_ON_APPROACHING = "approaching";
export const STATUS_ON_SCHEDULED = "on_schedule";
export const STATUS_ON_DELAYED = "delayed";
export const STATUS_ARRIVED = "arrived";

export const stages = {
  requested: {
    name: "status.requested",
    color: "#790053"
  }
};
export const stageCodes = {
  created: {
    order: 0,
    name: "status.created",
    color: "#790053"
  },
  unassigned: {
    order: 1,
    name: "status.unassigned",
    color: "#790053"
  },
  requested: {
    order: 2,
    name: "status.requested",
    code: "requested",
    color: "#790053"
  },
  scheduled: {
    order: 3,
    code: "scheduled",
    name: "status.scheduled",
    color: "#00928f"
  },
  enroute_to_pickup: {
    order: 4,
    code: "enroute_to_pickup",
    name: "status.enroutetopickup"
  },
  loading: {
    code: "loading",
    order: 5,
    name: "status.loading"
  },
  enroute_to_destination: {
    order: 6,
    code: "enroute_to_destination",
    name: "status.enroutetodestination"
  },
  unloading: {
    order: 7,
    code: "unloading",
    name: "status.unloading"
  },
  completed: {
    order: 8,
    code: "completed",
    name: "status.completed",
    color: "#000928f"
  },

  cancelled: {
    code: "cancelled",
    order: 9,
    name: "status.cancelled"
  },

  0: {
    name: "status.requested",
    color: "#790053"
  },
  1: {
    name: "status.scheduled",
    color: "#00928f"
  },
  2: {
    name: "status.enroute",
    color: "#004296"
  },
  3: {
    name: "status.approaching",
    color: "#ffa726"
  },
  4: {
    name: "status.arrived",
    color: "#004296"
  },
  5: {
    name: "status.processing",
    color: "#009627"
  }
};
export const statusCodes = {
  approaching: {
    name: "status.approaching",
    color: "#ffa529",
    code: "approaching"
  },
  on_schedule: {
    name: "status.on_schedule",
    color: "#009627"
  },
  delayed: {
    name: "status.delayed",
    color: "#f24200"
  },
  arrived: {
    name: "status.arrived",
    color: "#c57700",
    code: "arrived"
  },
  0: {
    name: "status.ontime",
    color: "#009627"
  },
  1: {
    name: "status.delayed",
    color: "#00928f"
  },
  2: {
    name: "status.enroute",
    color: "#004296"
  },
  3: {
    name: "status.approaching",
    color: "#ffa726"
  },
  4: {
    name: "status.arrived",
    color: "#004296"
  },
  5: {
    name: "status.processing",
    color: "#009627"
  }
};
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error);
    try {
      if (401 === error.response.status) {
        const currentRoute = NavigationService.getCurrentRoute();
        if (
          currentRoute.routeName !== "SignIn" &&
          currentRoute.routeName !== "OtpScreen"
        ) {
          NavigationService.navigate("SignIn");
        }
        // OneSignal.setSubscription(false);
        AsyncStorage.clear();
        // HACK till permissions get resolved.
        AsyncStorage.setItem("hasLoggedIn", "true");
      }
      if (error.code === "ECONNABORTED") {
        message = "Something went wrong.";
        return Promise.reject(message);
      }
      if (error.response) {
        if (error.response.data) {
          message = error.response.data.error;
        } else {
          message = "Something went wrong.";
        }
      } else {
        message = error.message;
      }
      return Promise.reject(message);
    } catch (e) {
      return Promise.reject("Something went wrong.");
    }
  }
);
/**
 * RN CONFIG
 */

export const RNConfig = {
  IS_PRODUCTION: Config.IS_PRODUCTION,
  API_HOST: Config.API_HOST,
  TARGET_NAME: Config.TARGET_NAME,
  VERSION: Config.VERSION,
  CODE_PUSH_IOS: Config.CODE_PUSH_IOS,
  CODE_PUSH_ANDROID: Config.CODE_PUSH_ANDROID,
  SENTRY: Config.SENTRY
};
