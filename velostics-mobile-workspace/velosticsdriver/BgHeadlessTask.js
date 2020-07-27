import { updateLocationToServer } from "./src/helpers/backgroundLocationHelper";
module.exports = async location => {
  console.log(location);
  updateLocationToServer({ location });
};
