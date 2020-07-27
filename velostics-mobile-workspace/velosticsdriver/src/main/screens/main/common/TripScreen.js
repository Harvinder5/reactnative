import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo
} from "react";
import { Image, TouchableOpacity } from "react-native";
import { observer } from "mobx-react-lite";
import { injectIntl } from "react-intl";
import { ScrollView, StyleSheet } from "react-native";
import {
  Container,
  ButtonContainer,
  StyledCategoryHeader,
  Footer
} from "./TripScreen.styles";
import { WithLoading } from "@velostics/shared/src/uikit";
import { Card } from "@velostics/shared/src/uikit/layouts/layout";
import { Text, NavBar } from "@velostics/shared";
import { TripPlaceContainerView } from "@velostics/shared/src/uikit";
import { Analytics } from "@velostics/shared";
import Button from "@velostics/shared/src/uikit/buttons/Button";
import { ManifestSection } from "./components/Manifest";
import Docs, { docsFilter, imageFilter } from "./components/Docs";

import ShipmentService from "../../../../services/ShipmentService";
import {
  STAGE_SCHEDULED,
  STAGE_REQUEST,
  STAGE_ENROUTE_TO_PICKUP,
  STATUS_ARRIVED,
  STAGE_LOADING,
  STAGE_ENROUTE_TO_DESTINATION,
  STAGE_UNLOADING,
  STAGE_COMPLETED,
  stageCodes
} from "@velostics/shared/src/settings";
import { ShipmentsContext } from "../../../../stores/ShipmentsStore";
import TripButton from "./components/TripButton";
import { AuthStoreContext } from "../../../../stores/AuthStore";
import Instructions from "./components/Instructions";
import ChecklistModal from "../../../components/modals/ChecklistModal";
import { shouldOpenChecklist } from "@velostics/shared/src/settings/utilityFunctions";
import { Row } from "@velostics/shared/src/uikit/layouts/layout";
import MessagesInfoTile from "@velostics/shared/src/uikit/listtiles/MessagesInfoTile";
import ShipStageChangeModal from "./components/ShipStageChangeModal";

const MANIFEST = "manifest";
const TRUCK = "truck";
const OTHER_PHOTOS = "other-photos";

export const arrivedCheck = data => {
  if (
    data.stage === STAGE_ENROUTE_TO_PICKUP &&
    data.status === STATUS_ARRIVED
  ) {
    return true;
  } else if (
    data.stage === STAGE_LOADING ||
    data.stage === STAGE_UNLOADING ||
    data.stage === STAGE_ENROUTE_TO_DESTINATION ||
    data.stage === STAGE_COMPLETED
  ) {
    return true;
  }
  return false;
};

export const unloaded = data => {
  if (
    data.stage === STAGE_ENROUTE_TO_DESTINATION &&
    data.status === STATUS_ARRIVED
  ) {
    return true;
  } else if (data.stage === STAGE_UNLOADING || data.stage === STAGE_COMPLETED) {
    return true;
  }
  return false;
};
const getTitle = (stage, error) => {
  if (error) {
    return "trip.title.error";
  }
  if (!stage) {
    return "trip.title.loading";
  }
  switch (stage) {
    case STAGE_COMPLETED:
      return "trip.title.completed";
    case STAGE_REQUEST:
      return "trip.title.requested";
    case STAGE_SCHEDULED:
      return "trip.title.scheduled";
    default:
      return "trip.title.currenttrip";
  }
};

const TripPhotoContainer = ({ data }) => {
  const photos = data.attachments.filter(attachment => {
    if (
      (attachment.mimetype &&
        attachment.mimetype.includes("image/") &&
        attachment.type === MANIFEST) ||
      attachment.type === TRUCK ||
      attachment.type === OTHER_PHOTOS
    ) {
      return true;
    }
    return false;
  });
  if (data.stage === STAGE_COMPLETED || data.stage === STAGE_REQUEST) {
    if (imageFilter(data).length === 0) {
      return null;
    }
  }
  return (
    <>
      <StyledCategoryHeader title="trip.photos" />
      <Docs data={data} displayType="photos" />
    </>
  );
};
export const TripDocsContainer = ({ data }) => {
  if (data.stage === STAGE_COMPLETED || data.stage === STAGE_REQUEST) {
    if (docsFilter(data).length === 0) {
      return null;
    }
  }
  return (
    <>
      <StyledCategoryHeader title="trip.docs" />
      <Docs data={data} />
    </>
  );
};
const Header = ({ data, navigation }) => {
  const onPress = () => {
    navigation.navigate("QRCode");
  };
  return (
    <Row justify="space-between">
      <Text
        capitalize
        h3
        font="primarySemiBold"
        margin="5px 0px"
        style={{ flex: 1 }}
      >
        {`${data.shipment_name}`}
      </Text>
      <TouchableOpacity onPress={onPress} style={styles.qrContainer}>
        <Image
          source={require("../../../../../assets/qrcode.png")}
          style={styles.qrImage}
        />
      </TouchableOpacity>
    </Row>
  );
};
const shipmentService = new ShipmentService();

const TripScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [isChecklistVisible, setIsChecklistVisible] = useState({
    isVisible: false,
    shipment: null
  });
  const [stageChangeModalState, setStageChangeModalState] = useState({
    isVisible: false,
    stage: null
  });
  const shipmentStore = useContext(ShipmentsContext);
  const [messageTileData, setMessageTileData] = useState({
    title: "",
    description: ""
  });
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  useEffect(() => {
    if (loading) {
      setError(false);
    }
  }, [loading]);
  const authStore = useContext(AuthStoreContext);
  const shipmentId = navigation.getParam("id");
  const triggerChecklist = Boolean(navigation.getParam("triggerChecklist"));

  useEffect(() => {
    if (triggerChecklist) {
      setIsChecklistVisible({ isVisible: true, shipment: data });
    }
  }, [triggerChecklist]);

  const getData = useCallback(
    async ({ shouldLoad = true, shouldShowError = true }) => {
      const id = navigation.getParam("id");
      try {
        if (data.stage || shouldLoad) {
          setLoading(shouldLoad);
        }
        const shipment = await shipmentService.getShipmentById(id);
        setData(shipment);
        const t = shipment.collaborators.reduce(
          (message, collaborator, index, arr) => {
            if (index === 3) {
              message = `${message} and ${arr.length - 3} others`;
            } else if (index < 3) {
              message += `${collaborator.user.name} ${index === 2 ? "" : ", "}`;
            }
            return message;
          },
          ""
        );
        setMessageTileData({ title: t, description: "Check your messages" });
        setLoading(false);
        return shipment;
      } catch (e) {
        console.log(e);
        if (shouldShowError) {
          setError(e.message);
        }
        setLoading(false);
        return false;
      }
    },
    [data]
  );
  const closeCheckList = useCallback(() => {
    setIsChecklistVisible({ isVisible: false, shipment: null });
  }, [setIsChecklistVisible]);

  const onCheckListComplete = useCallback(
    data => {
      setData(data);
      if (data.stage === stageCodes.unloading.code) {
        openStageChangeModal(stageCodes.completed.code);
      } else if (data.stage === stageCodes.loading.code) {
        openStageChangeModal(stageCodes.enroute_to_destination.code);
      }
    },
    [data, openStageChangeModal]
  );
  const handleChecklistPress = shipment => {
    setIsChecklistVisible({ isVisible: true, shipment: shipment || data });
  };
  const openCheckListModalOnStart = shipment => {
    if (shouldOpenChecklist(shipment)) {
      handleChecklistPress(shipment);
    }
  };
  const openStageChangeModal = stage => {
    setStageChangeModalState({ isVisible: true, stage });
  };
  const handleTripButtonData = data => {
    openCheckListModalOnStart(data);
    setData(data);
  };
  const handleStageChangeModalPress = () => {
    shipmentStore.updateTripAsync(
      data.id,
      {
        stage: stageChangeModalState.stage
      },
      setData
    );
    closeCompleteModal();
  };
  const closeCompleteModal = () => {
    setStageChangeModalState({ isVisible: false, stage: null });
  };
  useEffect(() => {
    shipmentStore.visitShipment(shipmentId);
    let interval;
    (async () => {
      const data = await getData({ shouldLoad: false });
      if (data) {
        openCheckListModalOnStart(data);
      }
      Analytics.screenView("TripScreen");
      interval = setInterval(() => {
        getData({ shouldLoad: false });
      }, 45000);
    })();
    return () => {
      clearInterval(interval);
      authStore.socket.emit("leave-shipment", shipmentId);
    };
  }, []);

  const handleMessageRedirect = useCallback(() => {
    navigation.navigate("Chat", {
      id: data.id,
      showGoto: false,
      shipment: data
    });
  }, [data]);
  const isUpdating = useMemo(
    () =>
      shipmentStore.shipmentUpdateLoading.find(id => data.id === id)
        ? true
        : false,
    [data, shipmentStore.shipmentsLoading]
  );
  const renderTripButton = useCallback(() => {
    if (shouldOpenChecklist(data)) {
      return (
        <Button
          onPress={() => handleChecklistPress()}
          // arrow function to eliminate event object as a param.
          margin="0px 5px 0px 0px"
          title="trip.beginchecklist"
          lightPrimary
          expand
        />
      );
    } else {
      return (
        <TripButton
          data={data}
          getData={getData}
          onNewDataReceived={handleTripButtonData}
          showCloseButton
        />
      );
    }
  }, [data]);
  return (
    <Container>
      <NavBar
        showBackText={false}
        white
        titleProps={{
          color: "primary",
          colorIndex: 1
        }}
        title={getTitle(getValue(["stage"], data), error)}
      />
      <WithLoading
        loading={loading}
        error={error}
        onRetry={() => getData({ shouldLoad: true })}
      >
        <ScrollView>
          <Card>
            <Header data={data} navigation={navigation} />
            <TripPlaceContainerView
              data={data}
              showDirection
              detailed
              arrived={arrivedCheck(data)}
              reached={unloaded(data)}
            />
            <MessagesInfoTile
              onPress={handleMessageRedirect}
              title={messageTileData.title}
              description={messageTileData.description}
            />
          </Card>

          <Instructions data={data} />
          <ManifestSection data={data} />
          <TripPhotoContainer data={data} />
          <TripDocsContainer data={data} />
        </ScrollView>
        <Footer>
          <ButtonContainer>{renderTripButton()}</ButtonContainer>
        </Footer>
        <ChecklistModal
          data={isChecklistVisible.shipment}
          isVisible={isChecklistVisible.isVisible}
          close={closeCheckList}
          onComplete={onCheckListComplete}
        />

        <ShipStageChangeModal
          isVisible={stageChangeModalState.isVisible}
          onPress={handleStageChangeModalPress}
          loading={isUpdating}
          close={closeCompleteModal}
          stage={stageChangeModalState.stage}
        />
      </WithLoading>
    </Container>
  );
};

const styles = StyleSheet.create({
  dashStyle: {
    width: "100%",
    height: 1,
    marginTop: 20,
    marginBottom: 12
  },
  qrContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  qrImage: {
    height: 22,
    width: 22
  },
  secondaryDash: {
    width: "100%",
    height: 1,
    marginBottom: 12,
    marginTop: 12
  }
});
export default observer(injectIntl(TripScreen));
