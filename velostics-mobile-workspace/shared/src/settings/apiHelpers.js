import axios from "axios";

export const uploadImageAsync = async image => {
  console.log(image);
  const form = new FormData();

  form.append("file", {
    uri: image.path,
    type: image.mime,
    name: "image.jpg"
  });
  try {
    const { data } = await axios.post("/upload", form);
    console.log("upload data");
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
