import React, { useState, useEffect } from "react";
import { Alert, Linking, Platform } from "react-native";
import { Asset, Constants, Permissions } from "react-native-unimodules";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { showMessage, hideMessage } from "react-native-flash-message";
import { uploadImageAsync } from "../../settings/apiHelpers";
import RNImagePicker from "react-native-image-crop-picker";

import {
  ContentContainer,
  ContentHeader,
  ButtonContainer,
  StyledActivityIndicator
} from "./ImagePicker.styles";
import { Text } from "../text/Text";
import { TextButton } from "../buttons/Button";
const CAMERA = "camera";
const GALLERY = "gallery";
const re = /(?:\.([^.]+))?$/;
const compression = Platform.OS === "ios" ? 0.8 : 0.8;
getPermissionAsync = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // if (status !== 'granted') {
    //   Alert.alert('Sorry, we need camera roll permissions to make this work!');
    // }
  }
  return;
};
const ImagePicker = ({ onUpload, onClose, isVisible, options }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = type => async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);

    await getPermissionAsync();
    let result;
    if (status === "granted") {
      try {
        if (type === CAMERA) {
          const imageFromCamera = await RNImagePicker.openCamera({
            compressImageQuality: compression,
            mediaType: "image"
            // cropping: true
          });
          result = imageFromCamera;
        } else {
          const imageFromLibrary = await RNImagePicker.openPicker({
            compressImageQuality: compression,
            mediaType: "image"
          });
          result = imageFromLibrary;
        }
      } catch (e) {
        console.log(e);
      }
      if (!result) {
        if (options.length === 1) {
          onClose();
        }
        return;
      }

      try {
        setLoading(true);
        const data = await uploadImageAsync(result);
        var ext = re.exec(data)[1]; // "txt"
        onUpload({ url: data.url, mimetype: result.mime });
        setLoading(false);
        onClose();
      } catch (e) {
        console.log(e);
        setLoading(false);
        showMessage({
          message: e.message,
          type: "danger"
        });
      }
    } else if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        Alert.alert("Please give camera in application settings", " ", [
          {
            text: "Ok",
            onPress: () => Linking.openURL("app-settings:")
          },
          {
            text: "Cancel",
            style: "cancel"
          }
        ]);
      }
    }
  };
  const renderButtons = () => {
    if (loading) {
      return <StyledActivityIndicator size="large" />;
    }
    return (
      <>
        {options.map(option => {
          return (
            <TextButton
              h4
              key={option}
              id={`imagepicker.${option}`}
              locale
              marginVertical={10}
              onPress={handleClick(option)}
            />
          );
        })}
      </>
    );
  };
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.3}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
    >
      <ContentContainer>
        <ContentHeader>
          <Text
            h3
            white
            font="primarySemiBold"
            locale
            id={loading ? "imagepicker.loading" : "imagepicker.title"}
          />
        </ContentHeader>
        <ButtonContainer>{renderButtons()}</ButtonContainer>
      </ContentContainer>
    </Modal>
  );
};
ImagePicker.propTypes = {
  isVisible: PropTypes.bool,
  onUpload: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  options: PropTypes.array
};
ImagePicker.defaultProps = {
  isVisible: false,
  options: ["camera", "gallery"]
};
export default ImagePicker;
