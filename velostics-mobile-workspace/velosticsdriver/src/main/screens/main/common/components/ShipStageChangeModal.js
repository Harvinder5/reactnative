import React from "react";
import styled from "styled-components/native";
import { Modal } from "react-native";
import { Text, Button, CustomIcon } from "@velostics/shared";
import { StyleSheet } from "react-native";
import hexToRgba from "hex-to-rgba";

const Container = styled.View`
  flex: 1;
  background-color: ${hexToRgba("#000", 0.4)};
  justify-content: center;
  padding: 0px 15px;
`;
const Content = styled.View`
  background-color: ${props => props.theme.colors.white[0]};
  border-radius: 5px;
  align-items: center;
  padding: 18px;
  min-height: 100px;
`;
const ShipStageChangeModal = ({
  isVisible,
  close,
  loading,
  onPress,
  stage
}) => {
  return (
    <Modal
      transparent
      backdropOpacity={0.2}
      style={styles.modal}
      visible={isVisible}
    >
      <Container>
        <Content>
          <CustomIcon
            name="cross"
            color="pureGrey"
            style={styles.cross}
            size={16}
            onPress={close}
          />
          <Text
            size="h4"
            font="primarySemiBold"
            id={`trip.modal.${stage}.title`}
            locale
          />
          <Text
            size="p15"
            center
            id={`trip.modal.${stage}.message`}
            locale
            margin="8px 0px"
          />
          <Button
            loading={loading}
            title={`trip.modal.${stage}.button`}
            lightPrimary
            onPress={onPress}
          />
        </Content>
      </Container>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    backgroundColor: "transparent"
  },
  cross: {
    position: "absolute",
    right: 5,
    top: 5,
    padding: 10
  }
});
export default ShipStageChangeModal;
