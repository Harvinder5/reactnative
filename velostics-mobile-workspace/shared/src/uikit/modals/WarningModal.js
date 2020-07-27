import React, { useState } from "react";
import { Asset, Constants, Permissions } from "react-native-unimodules";
import PropTypes from "prop-types";
import { ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import { showMessage, hideMessage } from "react-native-flash-message";
import { uploadImageAsync } from "../../settings/apiHelpers";
import {
  ContentContainer,
  ContentHeader,
  ButtonContainer,
  StyledActivityIndicator
} from "./WarningModal.styles";
import { Text } from "../text/Text";
import { TextButton } from "../buttons/Button";
const WarningModal = ({
  onCancel,
  onConfirm,
  title,
  loading,
  isVisible,
  shouldCancel,
  confirmText,
  cancelText
}) => {
  const renderButtons = () => {
    if (loading) {
      return <ActivityIndicator size="small" />;
    }
    return (
      <>
        <TextButton
          h4
          id={cancelText}
          locale
          marginVertical={10}
          onPress={onCancel}
        />
        <TextButton
          h4
          id={confirmText}
          locale
          marginVertical={10}
          onPress={() => {
            if (shouldCancel) {
              onCancel();
            }
            onConfirm();
          }}
        />
      </>
    );
  };
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.3}
      onBackButtonPress={onCancel}
      onBackdropPress={onCancel}
    >
      <ContentContainer>
        <ContentHeader>
          <Text center h3 white font="primarySemiBold" locale id={title} />
        </ContentHeader>
        <ButtonContainer>{renderButtons()}</ButtonContainer>
      </ContentContainer>
    </Modal>
  );
};
WarningModal.propTypes = {
  isVisible: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  shouldCancel: PropTypes.bool,
  loading: PropTypes.bool,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string
};
WarningModal.defaultProps = {
  isVisible: false,
  confirmText: "modal.warning.confirm",
  cancelText: "modal.warning.cancel",
  shouldCancel: true,
  title: "modal.warning.title",
  loading: false,
  onConfirm: () => {},
  onCancel: () => {}
};
export default WarningModal;
