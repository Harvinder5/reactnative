import React, { useMemo } from "react";
import { Clipboard } from "react-native";
import { format } from "date-fns";
import { useBottomActionSheet } from "../../hooks";
import { injectIntl } from "react-intl";
import {
  Container,
  PlaceNameText,
  DescriptionText,
  DetailText,
  DirectionIconContainer
} from "./TripPlaceView.styles";
import { Text } from "../text/Text";
import { CustomIcon } from "../../utils/Expo/UI";
const PICKUP_TEXT = "trip.pickup";
const DELIVERY_TEXT = "trip.delivery";

const options = [
  "trip.actionsheet.openmap",
  "trip.actionsheet.copyaddress",
  "trip.actionsheet.cancel"
];
const TripPlaceView = ({
  heading,
  arrived,
  type,
  date,
  from,
  to,
  detail,
  showDirection,
  intl,
  onDirectionClick,
  ...rest
}) => {
  const { showBottomActionSheet } = useBottomActionSheet({ options });
  const description = useMemo(
    () =>
      `${
        type === "pickup"
          ? intl.messages[PICKUP_TEXT]
          : intl.messages[DELIVERY_TEXT]
      }: ${format(from, "MM/DD/YYYY \u2022 hh:mm A")} - ${format(
        to,
        "MM/DD/YYYY \u2022 hh:mm A"
      )}`,
    [from]
  );
  const finalDes = useMemo(
    () =>
      `${
        type === "pickup"
          ? intl.messages[PICKUP_TEXT]
          : intl.messages[DELIVERY_TEXT]
      }: ${format(date, "MM/DD/YYYY \u2022 hh:mm A")}`,
    [date]
  );

  const handleDirectionPress = () => {
    showBottomActionSheet(buttonIndex => {
      if (buttonIndex === 0) {
        onDirectionClick();
      } else if (buttonIndex === 1) {
        Clipboard.setString(detail);
      }
    });
  };
  return (
    <Container {...rest}>
      <PlaceNameText capitalize arrived={arrived}>
        {heading}
      </PlaceNameText>
      {detail && !arrived ? (
        <DetailText semiBold h5 lightPrimary>
          {detail}
        </DetailText>
      ) : null}
      <DescriptionText>
        {date ? finalDes : from ? description : "-"}
      </DescriptionText>
      {showDirection && !arrived && (
        <DirectionIconContainer onPress={handleDirectionPress}>
          <CustomIcon lightPrimary name="direction" size={28} />
        </DirectionIconContainer>
      )}
    </Container>
  );
};
export default injectIntl(TripPlaceView);
