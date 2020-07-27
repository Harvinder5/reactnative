export const VERSION = "v0.1.2";
import { decode as atob, encode as btoa } from "base-64";
import axios from "axios";
if (!global.btoa) {
  global.btoa = btoa;
}

if (!global.atob) {
  global.atob = atob;
}

export const STAGE_REQUEST = "requested";
export const STAGE_SCHEDULED = "scheduled";
export const STAGE_ENROUTE_TO_PICKUP = "enroute_to_pickup";

// status
export const STAGE_ON_SCHEDULED = "on_schedule";
export const STATUS_ON_DELAYED = "delayed";

export const stages = {
  requested: {
    name: "status.requested",
    color: "#790053"
  }
};
export const stageCodes = {
  requested: {
    name: "status.requested",
    color: "#790053"
  },
  scheduled: {
    name: "status.scheduled",
    color: "#00928f"
  },
  completed: {
    name: "status.completed",
    color: "#000928f"
  },
  enroute_to_pickup: {
    name: "status.enroutetopickup"
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
