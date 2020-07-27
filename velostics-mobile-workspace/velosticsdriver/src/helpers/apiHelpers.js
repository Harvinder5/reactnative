import axios from "axios";

export const uploadImageAsync = async () => {
  try {
    const { data } = await axios.post();
    return data;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
