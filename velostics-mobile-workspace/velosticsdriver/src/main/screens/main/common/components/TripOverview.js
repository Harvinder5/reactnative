import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import Dash from "react-native-dash";
import hexToRgba from "hex-to-rgba";
import { Row } from "@velostics/shared/src/uikit/layouts/layout";
import { View, Image } from "react-native";
import { Text, StageTile, StatusTile } from "@velostics/shared";
import { stageCodes } from "@velostics/shared/src/settings";
import { DateDisplay } from "@velostics/shared/src/uikit";
import { TextButton } from "@velostics/shared/src/uikit/buttons/Button";

const COMPLETED = stageCodes.completed.code;
const REQUESTED = stageCodes.requested.code;
const ENROUTE_PICKUP = stageCodes.enroute_to_pickup.code;
const ENROUTE_DES = stageCodes.enroute_to_destination.code;

const TripOverview = React.memo(({ data }) => {
  const eta = useMemo(() => {
    if (data.stage === ENROUTE_PICKUP && data.shipper_eta) {
      return data.shipper_eta;
    } else if (data.stage === ENROUTE_DES && data.consignee_eta) {
      return data.consignee_eta;
    } else return null;
  }, [data.stage, data.consignee_eta, data.shipper_eta]);
  return (
    <>
      <View>
        <Text capitalize h3 font="primarySemiBold" margin="5px 0px">
          {data.shipment_name}
        </Text>
        <Text color="darkText" h5>
          <Text capitalize>{data.shipper ? data.shipper.name : ""}</Text> >{" "}
          <Text capitalize>{data.consignee ? data.consignee.name : ""}</Text>
        </Text>
        <StageTile status={data.stage} />
        {data.status && data.stage !== COMPLETED ? (
          <StatusTile status={data.status} />
        ) : null}
        {data.stage !== COMPLETED || eta ? (
          <Text margin="7px 0px 0px" h5 font="primarySemiBold">
            ETA: <DateDisplay font="primary" date={eta} />
          </Text>
        ) : null}
      </View>
    </>
  );
});
const styles = StyleSheet.create({
  dashStyle: {
    width: "100%",
    height: 1,
    marginTop: 20,
    marginBottom: 12
  }
});
export default TripOverview;
