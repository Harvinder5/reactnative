import React, { useContext, useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { observer } from "mobx-react-lite";
import hexToRgba from "hex-to-rgba";
import { ButtonLoadingContainer } from "./ShipmentListItem.styles";
import { withNavigation } from "react-navigation";
import Dash from "react-native-dash";
import { ButtonContainer } from "../../screens/main/common/TripScreen.styles";
import { Text } from "@velostics/shared";
import { TripPlaceContainerView } from "@velostics/shared/src/uikit";
import Button from "@velostics/shared/src/uikit/buttons/Button";
import { Card, Row } from "@velostics/shared/src/uikit/layouts/layout";
import { CustomIcon } from "@velostics/shared/src/utils/Expo/UI";
import { ShipmentsContext } from "../../../stores/ShipmentsStore";
import TripButton from "../../screens/main/common/components/TripButton";
export const TYPE_CURRENT = 2;
export const TYPE_SCHEDULED = 1;
export const TYPE_REQUESTED = 0;
export const TYPE_COMPLETED = 3;
//
import { arrivedCheck, unloaded } from "../../screens/main/common/TripScreen";
import RedDot from "@velostics/shared/src/uikit/dots/RedDot";
import { shouldOpenChecklist } from "@velostics/shared/src/settings/utilityFunctions";

const ShipmentListItem = ({ data, navigation, onCheckListPress, ...rest }) => {
  const handleClick = () => {
    requestAnimationFrame(() => {
      navigation.navigate("TripScreen", {
        stage: data.stage.type,
        id: data.id
      });
    });
  };
  const renderTripButton = () => {
    if (shouldOpenChecklist(data)) {
      return (
        <Button
          onPress={handleClick}
          margin="0px 5px 0px 0px"
          title="trip.beginchecklist"
          lightPrimary
          expand
        />
      );
    }
    return <TripButton data={data} shouldNavigate />;
  };
  // console.log(data.stage.type);

  return (
    <Card>
      <TouchableOpacity onPress={handleClick} activeOpacity={0.8}>
        <Row fullWidth jsb aic marginBottom="10">
          <Text
            capitalize
            lightPrimary
            size="h3"
            font="primarySemiBold"
            style={{ flex: 1 }}
          >
            {`${data.shipment_name}`}
          </Text>
          <Row aic>
            <CustomIcon name="right-open" color="pureGrey" size={20} />
            {!data.viewed && <RedDot marginLeft="4px" />}
          </Row>
        </Row>
        <TripPlaceContainerView
          data={data}
          detailed
          showDirection
          homeSelected={false}
          arrived={arrivedCheck(data)}
          reached={unloaded(data)}
        />
        <Dash
          style={styles.dash}
          dashThickness={1}
          dashGap={0}
          dashColor={hexToRgba("#b2b2b2", 0.5)}
        />
        <ButtonContainer>{renderTripButton()}</ButtonContainer>
      </TouchableOpacity>
    </Card>
  );
};
const styles = StyleSheet.create({
  dash: {
    width: "100%",
    height: 1,
    marginTop: 15
  }
});
export default withNavigation(observer(ShipmentListItem));
