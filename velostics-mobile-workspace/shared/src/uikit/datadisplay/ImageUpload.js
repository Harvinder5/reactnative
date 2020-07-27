import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { showMessage } from "react-native-flash-message";
import { Platform } from "react-native";
import RNImagePicker from "react-native-image-crop-picker";
import styled from "styled-components/native";
import ProgressiveImage from "./ProgressiveImage";
import { Permissions } from "react-native-unimodules";
import { uploadImageAsync } from "../../settings/apiHelpers";

const compression = Platform.OS === "ios" ? 0.8 : 0.8;

export const Image = styled(ProgressiveImage)`
  height: 105px;
  width: 105px;
`;

const ImageUpload = ({
  onUpload,
  source,
  shouldUpdateImage,
  onLoadingChange,
  ...props
}) => {
  const [img, setImg] = useState(
    source || require("../../../assets/camtruck.png")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // TODO, ERROR handling.
  useEffect(() => {
    onLoadingChange(loading);
  }, [loading]);
  const handleImageUpload = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      let result;

      if (status === "granted") {
        result = await RNImagePicker.openCamera({
          compressImageQuality: compression,
          mediaType: "image"
        });
        setLoading(true);
        setError(false);
        const data = await uploadImageAsync(result);
        if (shouldUpdateImage) {
          setImg({ uri: data.url });
        }
        setLoading(false);
        onUpload({ uri: data.url, mimetype: result.mime });
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError(true);
      //   showMessage({
      //     message: e.message,
      //     type: "danger"
      //   });
    }
  };

  return (
    <Image
      source={img}
      loading={loading}
      onPress={handleImageUpload}
      {...props}
    />
  );
};
ImageUpload.defaultProps = {
  onUpload: () => {},
  onLoadingChange: () => {},
  shouldUpdateImage: true
};
ImageUpload.propTypes = {
  onUpload: PropTypes.func,
  onLoadingChange: PropTypes.func,
  shouldUpdateImage: PropTypes.bool
};

export default ImageUpload;
