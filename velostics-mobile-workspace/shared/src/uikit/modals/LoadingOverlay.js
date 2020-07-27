import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { Text } from "../text/Text";

const Spinner = styled.ActivityIndicator``;
const Container = styled.View``;
const LoadingOverlay = ({ loading, message, close }) => {
  return (
    <Modal
      isVisible={loading}
      backdropOpacity={0.7}
      onBackButtonPress={close}
      onBackdropPress={close}
    >
      <Container>
        <Spinner size="large" />
        {message && <Text id={message} locale center size="h6" white />}
      </Container>
    </Modal>
  );
};
LoadingOverlay.propTypes = {
  loading: PropTypes.bool,
  message: PropTypes.any
};
LoadingOverlay.defaultProps = {
  loading: false,
  message: null
};
export default LoadingOverlay;
