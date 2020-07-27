import React, { useCallback, useContext, useMemo, useState } from "react";

import styled from "styled-components/native";

import { Button, NavBar, Text } from "@velostics/shared";
import { NavigationService } from "@velostics/shared/src/settings";
import { Card, Row } from "@velostics/shared/src/uikit/layouts/layout";
import hexToRgba from "hex-to-rgba";
import { observer } from "mobx-react-lite";
import { injectIntl } from "react-intl";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { showMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { ShipmentsContext } from "../../../../stores/ShipmentsStore";
import { inAppNotification } from "@velostics/shared/src/notifications";

const SCREEN_TYPES = {
  rejection: "rejection",
  delay: "delay"
};
const rejectionArray = [
  "I don't have the right truck",
  "I don't have required equipment",
  "I don't have the right documentation or permits",
  "Mechanical issues with truck",
  "I'm unavailable in the time frame"
];
const delayArray = [
  "Truck mechanical issues",
  "Exceeded driving time limit",
  "Unexpected traffic",
  "Other"
];
const rejectionReasons = rejectionArray.map((element, index) => ({
  checked: false,
  id: `${index}`,
  title: element,
  reason: false
}));

const delayReasons = delayArray.map((element, index) => ({
  checked: false,
  id: `${index}`,
  title: element,
  reason: false
}));
const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background[0]};
`;
export const Label = styled(Text).attrs({
  color: "darkText",
  semiBold: true
})`
  font-size: ${props =>
    props.size ? props.theme.fontSize[props.size] : props.theme.fontSize.h3}px;
`;
export const TextInput = styled.TextInput`
  height: 80px;
  padding: 15px;
  border-width: 0.5px;
  border-radius: 5px;
  margin-top: 15px;
  margin-bottom: 20px;
  border-color: ${props => hexToRgba(props.theme.colors.grey[0], 0.5)};
`;
export const ImageIcon = styled.Image`
  height: 24px;
  width: 24px;
  resize-mode: contain;
`;
const RejectionScreen = ({ navigation, intl }) => {
  const [note, setNote] = useState("");
  const [selectedReason, setSelectedReason] = useState(null);
  const shipmentStore = useContext(ShipmentsContext);
  const data = navigation.getParam("data");
  const screenType = navigation.getParam("type", SCREEN_TYPES.rejection);
  const handleDelay = navigation.getParam("handleDelay");

  const handleReject = async () => {
    if (!selectedReason) {
      showMessage({
        message: intl.formatMessage({ id: "error.rejection.empty" }),
        type: "danger"
      });
      return;
    }
    let reason = note;

    if (
      selectedReason &&
      rejectionReasons[rejectionReasons.length - 1].id === selectedReason.id
    ) {
      reason = note;
    } else {
      reason = selectedReason.title;
    }
    if (screenType === SCREEN_TYPES.rejection) {
      shipmentStore.rejectShipmentAsync(data.id, reason, () => {
        navigation.pop();
      });
    } else {
      if (handleDelay) {
        handleDelay(reason);
      }
    }

    inAppNotification(
      "Shipment Declined!",
      'The shipment is now under "History"',
      { onPress: () => NavigationService.replace("App") }
    );
  };

  const renderTitle = useCallback(() => {
    if (screenType === SCREEN_TYPES.rejection) {
      return (
        <Text id={"rejection.thanks"} locale center font="primarySemiBold" h4 />
      );
    }
    return null;
  }, [screenType]);

  const list = useMemo(
    () =>
      screenType === SCREEN_TYPES.rejection ? rejectionReasons : delayReasons,
    [screenType]
  );

  const renderList = useCallback(() => {
    return list.map(rejectionReason => {
      return (
        <TouchableOpacity
          key={rejectionReason.id}
          onPress={() => setSelectedReason(rejectionReason)}
        >
          <Row
            key={rejectionReason.id}
            marginVertical={10}
            style={{ marginTop: 10 }}
          >
            <ImageIcon
              source={
                getValue(["id"], selectedReason) === rejectionReason.id
                  ? require("../../../../../assets/checkmark_selected.png")
                  : require("../../../../../assets/checkmark_not_selected.png")
              }
            />
            <Text font="primarySemiBold" size="p15" margin="0px 0px 0px 10px">
              {rejectionReason.title}
            </Text>
          </Row>
        </TouchableOpacity>
      );
    });
  }, [screenType, selectedReason]);

  const renderShipmentName = useCallback(() => {
    if (screenType === SCREEN_TYPES.rejection) {
      <Text size="p15" font="primarySemiBold" margin="2px 0px 10px 0px">
        {data.shipment_name}
      </Text>;
    }
    return null;
  }, [data.shipment_name]);

  return (
    <Container>
      <NavBar
        title={
          screenType === SCREEN_TYPES.rejection
            ? "rejection.title"
            : "rejection.delay"
        }
      />
      <ScrollView>
        <KeyboardAwareScrollView
          extraHeight={200}
          nestedScrollEnabled
          style={{ flex: 1 }}
          renderToHardwareTextureAndroid
        >
          <Card marginVertical={20}>
            {renderTitle()}

            <Text
              id={
                screenType === SCREEN_TYPES.rejection
                  ? "rejection.message"
                  : "rejection.delaymessage"
              }
              locale
              size="p15"
              margin="20px 0px 0px 0px"
            />
            {renderShipmentName()}
            {renderList()}

            <TextInput
              placeholderTextColor="#272f40"
              multiline
              keyboard
              onChangeText={text => setNote(text)}
              style={styles.textInput}
              placeholder={intl.formatMessage({ id: "rejection.placeholder" })}
            />
            <Button
              loading={
                shipmentStore.rejectLoading ||
                shipmentStore.updateLoading.find(elm => elm === data.id)
                  ? true
                  : false
              }
              onPress={handleReject}
              expand
              title={
                screenType === SCREEN_TYPES.rejection
                  ? "rejection.button"
                  : "rejection.reportdelay"
              }
              lightPrimary
            />
          </Card>
        </KeyboardAwareScrollView>
      </ScrollView>
    </Container>
  );
};
const styles = StyleSheet.create({
  textInput: {
    textAlignVertical: "top"
  }
});
export default injectIntl(observer(RejectionScreen));
