import React, { useContext, useEffect, useState, useCallback } from "react";
import { SectionList } from "react-native";
import { withNavigation } from "react-navigation";
import { stageCodes } from "@velostics/shared/src/settings";
import { observer } from "mobx-react-lite";
import { Container } from "./ShipmentList.styles";
import { ShipmentsContext } from "../../../stores/ShipmentsStore";
import WithLoading from "@velostics/shared/src/uikit/hoc/WithLoading";
import { CategoryHeader } from "@velostics/shared";
import ShipmentListItem from "./ShipmentListItem";

const ShipmentList = ({ onRetry, onRefresh }) => {
  const shipmentStore = useContext(ShipmentsContext);
  const [shipmentList, setShipmentList] = useState([]);

  useEffect(() => {
    const result = [];

    // TODO use a single iterating to optimise this.

    const completedShipments = shipmentStore.shipments.filter(
      s =>
        s.stage === stageCodes.completed.code ||
        s.stage === stageCodes.cancelled.code
    );
    if (completedShipments.length > 0) {
      result.push({ title: "completed", data: completedShipments });
    }
    const requestedShipments = shipmentStore.shipments.filter(
      s => s.stage === stageCodes.requested.code
    );
    if (requestedShipments.length > 0) {
      result.unshift({ title: "requested", data: requestedShipments });
    }
    const scheduledShipments = shipmentStore.shipments.filter(
      s => s.stage === stageCodes.scheduled.code
    );
    if (scheduledShipments.length > 0) {
      result.unshift({ title: "scheduled", data: scheduledShipments });
    }
    const currentShipments = shipmentStore.shipments.filter(
      s => stageCodes[s.stage].order >= 4 && stageCodes[s.stage].order <= 7
    );
    if (currentShipments.length > 0) {
      result.unshift({ title: "current", data: currentShipments });
    }
    setShipmentList(result);
  }, [shipmentStore.shipments]);

  const renderListItem = ({ item }) => {
    return <ShipmentListItem data={item} />;
  };
  const renderSectionHeader = useCallback(({ section: { title } }) => {
    return (
      <CategoryHeader
        persistBackground
        marginTop="0px"
        paddingTop="10px"
        title={`shipments.section.${title}`}
      />
    );
  });
  return (
    <Container>
      <WithLoading
        error={shipmentStore.shipmentsError}
        loading={shipmentStore.shipmentsLoading}
        onRetry={onRetry}
      >
        <SectionList
          onRefresh={onRefresh}
          refreshing={shipmentStore.shipmentsRefreshing}
          sections={shipmentList}
          keyExtractor={(_, index) => index}
          renderItem={renderListItem}
          initialNumToRender={2}
          renderSectionHeader={renderSectionHeader}
        />
      </WithLoading>
    </Container>
  );
};
ShipmentList.propTypes = {};
export default withNavigation(observer(ShipmentList));
