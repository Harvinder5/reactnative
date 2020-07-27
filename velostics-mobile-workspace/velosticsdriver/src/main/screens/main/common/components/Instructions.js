import React from "react";
import { StyledCategoryHeader } from "../TripScreen.styles";
import { Text } from "@velostics/shared";
import { Card } from "@velostics/shared/src/uikit/layouts/layout";
const Instructions = ({ data }) => {
  console.log(data.instructions);
  if (data.instructions && data.instructions.trim()) {
    return (
      <>
        <StyledCategoryHeader title="trip.notes" />
        <Card minHeight={150}>
          <Text h4 lighter color="darkText">
            {data.instructions}
          </Text>
        </Card>
      </>
    );
  }
  return null;
};

export default Instructions;
