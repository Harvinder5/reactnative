import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState
} from "react";

import { useLocationPermission } from "@velostics/shared/src/hooks";
import {
  NavigationService,
  STAGE_COMPLETED,
  STAGE_ENROUTE_TO_DESTINATION,
  STAGE_LOADING,
  STAGE_UNLOADING,
  stageCodes,
  STATUS_ARRIVED,
  STATUS_ON_APPROACHING,
  STATUS_ON_DELAYED,
  STATUS_ON_SCHEDULED
} from "@velostics/shared/src/settings";
import Button, { TextButton } from "@velostics/shared/src/uikit/buttons/Button";
import { ButtonActivityIndicator } from "@velostics/shared/src/uikit/buttons/Button.styles";
import WarningModal from "@velostics/shared/src/uikit/modals/WarningModal";
import format from "date-fns/format";
import { observer } from "mobx-react-lite";
import { injectIntl } from "react-intl";
import { Alert, Clipboard, Linking } from "react-native";
import { withNavigation } from "react-navigation";

import { ShipmentsContext } from "../../../../../stores/ShipmentsStore";
import { TYPE_CURRENT } from "../../../../components/Lists/ShipmentListItem";
import { ButtonLoadingContainer } from "../../../../components/Lists/ShipmentListItem.styles";
import { inAppNotification } from "@velostics/shared/src/notifications";
import AndroidOpenSettings from "react-native-android-open-settings";
import { isIOS } from "@velostics/shared/src/settings/device";

const TripButton = ({
  data,
  getData,
  intl,
  navigation,
  onNewDataReceived,
  shouldNavigate = false,
  showCloseButton
}) => {
  const shipmentStore = useContext(ShipmentsContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const warningModalButtonPressRef = useRef(() => {});
  const locationPermission = useLocationPermission();

  const onDelayPress = () => {
    navigation.navigate("Rejection", {
      type: "delay",
      data,
      handleDelay: reason =>
        shipmentStore.updateTripAsync(
          data.id,
          { status: STATUS_ON_DELAYED, delay_reason: reason },
          onNewDataReceived
            ? data => {
                onNewDataReceived(data);
                navigation.pop();
              }
            : () => {
                navigation.pop();
              },
          shouldNavigate
        )
    });
  };

  const shipmentTripLoading = useMemo(() => {
    return shipmentStore.shipmentUpdateLoading.find(elm => elm === data.id)
      ? true
      : false;
  }, [data.stage, data.id, shipmentStore.shipmentUpdateLoading]);

  const handleStartTrip = useCallback(() => {
    if (locationPermission === "denied" || locationPermission === "limited") {
      Alert.alert(
        "Insufficient Location Permissions",
        isIOS
          ? 'Please set your location preferences to "Always Allow" to continue'
          : "Please enable location permissions to continue",
        [
          {
            text: "Go to Settings",
            onPress: () =>
              isIOS
                ? Linking.openURL("app-settings:")
                : AndroidOpenSettings.applicationSettings(),
            style: "default"
          }
        ]
      );
    } else {
      shipmentStore
        .startTripAsync(data.id, getData, shouldNavigate)
        .then(({ id, shipper }) => {
          Clipboard.setString(
            shipper.address1
              ? `${shipper.address1}${
                  shipper.address2 ? `, ${shipper.address2}` : ""
                }, ${shipper.city} ${shipper.zip_code}`
              : `${shipper.latitude},${shipper.longitude}`
          );

          inAppNotification(
            "Shipment En Route to Pickup!",
            "This pickup location address has been copied to your clipboard",
            { onPress: () => NavigationService.navigate("TripScreen", { id }) }
          );
        });
    }
  }, [locationPermission, data.id, onNewDataReceived]);

  const handleAccept = useCallback(() => {
    shipmentStore.acceptShipmentAsync(data.id, data => {
      if (typeof onNewDataReceived === "function") {
        onNewDataReceived(data.data);
      }

      inAppNotification(
        "Shipment Scheduled!",
        'This shipment is now under "Scheduled"'
      );
    });
  }, [data.id, onNewDataReceived]);

  const handleLoadingArrival = useCallback(() => {
    shipmentStore.updateTripAsync(
      data.id,
      { status: STATUS_ARRIVED },
      data => {
        if (onNewDataReceived) {
          onNewDataReceived(data);
        }
      },
      shouldNavigate
    );
  }, [data.id, onNewDataReceived]);

  const handleLeaveForDestination = useCallback(() => {
    shipmentStore.updateTripAsync(
      data.id,
      { stage: STAGE_ENROUTE_TO_DESTINATION },
      data => {
        if (onNewDataReceived) {
          onNewDataReceived(data);
        }

        const { consignee } = data;

        Clipboard.setString(
          consignee.address1
            ? `${consignee.address1}${
                consignee.address2 ? `, ${consignee.address2}` : ""
              }, ${consignee.city} ${consignee.zip_code}`
            : `${consignee.latitude},${consignee.longitude}`
        );

        inAppNotification(
          "Shipment En Route to Delivery!",
          "This delivery location address has been copied to your clipboard",
          {
            onPress: () =>
              NavigationService.navigate("TripScreen", { id: consignee.id })
          }
        );
      },
      shouldNavigate
    );
  }, [data.id, onNewDataReceived]);

  const handleCompleteTrip = useCallback(() => {
    warningModalButtonPressRef.current = () =>
      shipmentStore.updateTripAsync(
        data.id,
        { stage: STAGE_COMPLETED },
        data => {
          if (onNewDataReceived) {
            onNewDataReceived(data);
          }

          inAppNotification(
            "Shipment Completed!",
            "The shipment has been moved to your History tab.",
            {
              onPress: () => {
                const currentRoute = NavigationService.getCurrentRoute();

                if (currentRoute !== "TripScreen") {
                  NavigationService.navigate("TripScreen", { id: data.id });
                }
              }
            }
          );
        },
        shouldNavigate
      );
    setIsModalVisible(true);
  }, [data.id, onNewDataReceived]);

  const renderButton = () => {
    switch (data.stage) {
      case TYPE_CURRENT:
      case stageCodes.scheduled.code:
        return (
          <Button
            onPress={handleStartTrip}
            loading={shipmentTripLoading}
            margin="0px 5px 0px 0px"
            title="trip.leaveforpickup"
            lightPrimary
            expand
          />
        );
      case stageCodes.requested.code:
        if (shipmentTripLoading) {
          return (
            <ButtonLoadingContainer>
              <ButtonActivityIndicator size="small" />
            </ButtonLoadingContainer>
          );
        }
        return (
          <>
            <Button
              margin="0px 5px 0px 0px"
              title="trip.accept"
              lightPrimary
              noWidth
              onPress={handleAccept}
            />
            <TextButton
              color="grey"
              size="h4"
              font="primary"
              margin="10px 0px 0px 0px"
              onPress={() =>
                navigation.navigate("Rejection", {
                  data
                })
              }
              title="trip.reject"
            />
          </>
        );
      case stageCodes.enroute_to_pickup.code:
        if (
          data.status === STATUS_ON_SCHEDULED ||
          data.status === STATUS_ON_APPROACHING
        ) {
          if (shipmentTripLoading) {
            return (
              <ButtonLoadingContainer>
                <ButtonActivityIndicator size="small" />
              </ButtonLoadingContainer>
            );
          }
          return (
            <>
              <Button
                onPress={() => {
                  shipmentStore.updateTripAsync(
                    data.id,
                    { status: STATUS_ARRIVED, stage: STAGE_LOADING },
                    onNewDataReceived ? data => onNewDataReceived(data) : null,
                    shouldNavigate
                  );
                }}
                loading={shipmentTripLoading}
                margin="0px 5px 5px 0px"
                title="trip.reportarrival"
                lightPrimary
                noWidth
              />
              <TextButton
                color="grey"
                center
                size="h4"
                font="primary"
                margin="0px 3px 0px 6px"
                onPress={onDelayPress}
                title="trip.reportdelay"
              />
            </>
          );
        } else if (data.status === STATUS_ON_DELAYED) {
          return (
            <Button
              onPress={handleLoadingArrival}
              loading={shipmentTripLoading}
              margin="0px 5px 0px 0px"
              title="trip.reportarrival"
              lightPrimary
              expand
            />
          );
        } else if (data.status === STATUS_ARRIVED) {
          return (
            <Button
              onPress={() => {
                shipmentStore.updateTripAsync(
                  data.id,
                  { stage: STAGE_LOADING, status: STATUS_ON_SCHEDULED },
                  onNewDataReceived ? data => onNewDataReceived(data) : null,
                  shouldNavigate
                );
              }}
              loading={shipmentTripLoading}
              margin="0px 5px 0px 0px"
              title="trip.startloading"
              lightPrimary
              expand
            />
          );
        }
      case stageCodes.loading.code:
        return (
          <Button
            onPress={handleLeaveForDestination}
            loading={shipmentTripLoading}
            margin="0px 5px 0px 0px"
            title="trip.leavefordes"
            lightPrimary
            expand
          />
        );
      case stageCodes.enroute_to_destination.code:
        if (
          data.status === STATUS_ON_SCHEDULED ||
          data.status === STATUS_ON_APPROACHING
        ) {
          if (shipmentTripLoading) {
            return (
              <ButtonLoadingContainer>
                <ButtonActivityIndicator size="small" />
              </ButtonLoadingContainer>
            );
          }
          return (
            <>
              <Button
                onPress={() => {
                  shipmentStore.updateTripAsync(
                    data.id,
                    {
                      status: STATUS_ARRIVED,
                      stage: stageCodes.unloading.code
                    },
                    onNewDataReceived ? data => onNewDataReceived(data) : null,
                    shouldNavigate
                  );
                }}
                loading={shipmentTripLoading}
                margin="0px 5px 5px 0px"
                title="trip.reportarrival"
                lightPrimary
                noWidth
              />
              <TextButton
                color="grey"
                center
                size="h4"
                font="primary"
                margin="0px 3px 0px 6px"
                onPress={onDelayPress}
                title="trip.reportdelay"
              />
            </>
          );
        } else if (data.status === STATUS_ON_DELAYED) {
          return (
            <Button
              onPress={() => {
                shipmentStore.updateTripAsync(
                  data.id,
                  { status: STATUS_ARRIVED },
                  onNewDataReceived ? data => onNewDataReceived(data) : null,
                  shouldNavigate
                );
              }}
              loading={shipmentTripLoading}
              margin="0px 5px 0px 0px"
              title="trip.reportarrival"
              lightPrimary
              expand
            />
          );
        } else if (data.status === STATUS_ARRIVED) {
          return (
            <Button
              onPress={() => {
                shipmentStore.updateTripAsync(
                  data.id,
                  { stage: STAGE_UNLOADING },
                  onNewDataReceived ? data => onNewDataReceived(data) : null,
                  shouldNavigate
                );
              }}
              loading={shipmentTripLoading}
              margin="0px 5px 0px 0px"
              title="trip.startunloading"
              lightPrimary
              expand
            />
          );
        }
      case stageCodes.unloading.code:
        return (
          <Button
            onPress={handleCompleteTrip}
            loading={shipmentTripLoading}
            margin="0px 5px 0px 0px"
            title="trip.complete"
            lightPrimary
            expand
          />
        );
      case stageCodes.completed.code:
        return (
          <Button
            disabled
            margin="0px 5px 0px 0px"
            title={`${intl.formatMessage({ id: "trip.completed" })} ${format(
              data.completed_at,
              "MM/DD/YYYY"
            )} `}
            locale={false}
            expand
            textColor="white"
          />
        );
      default:
        return null;
    }
  };
  return (
    <>
      {renderButton()}
      <WarningModal
        isVisible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onConfirm={warningModalButtonPressRef.current}
      />
    </>
  );
};

export default injectIntl(withNavigation(observer(TripButton)));
