import React from "react";
import { Text } from "@velostics/shared";
import { ListTileContainer } from "./Manifest.styles";
import { Card } from "@velostics/shared/src/uikit/layouts/layout";
import { BULK } from "@velostics/shared/src/settings";
import { StyledCategoryHeader } from "../TripScreen.styles";
const ManifestTile = ({ heading, value }) => {
  return (
    <ListTileContainer>
      <Text h5 font="primaryMedium" locale id={heading} semiBold size="h4" />
      <Text h5 capitalize log>
        {`${value ? value : "-"}`}
      </Text>
    </ListTileContainer>
  );
};
export const Manifest = ({ data, type }) => {
  if (type === BULK) {
    return (
      <Card>
        <Text>
          <Text
            h5
            font="primaryMedium"
            locale
            id="manifest.description"
            semiBold
            size="h4"
          />
          <Text capitalize h5>
            {data.description || "-"}
          </Text>
        </Text>
        {/* <ManifestTile heading="manifest.liquidsolid" value={data.type} /> */}
        <ManifestTile
          heading="manifest.weight"
          value={
            data.weight
              ? `${data.weight} ${data.type === "solid" ? "Pounds" : "Gallons"}`
              : null
          }
        />
      </Card>
    );
  }
  return (
    <Card>
      <ManifestTile heading="manifest.packageno" value={data.package_no} />

      <Text>
        <Text
          h5
          font="primaryMedium"
          locale
          id="manifest.description"
          semiBold
          size="h4"
        />
        <Text capitalize h5>
          {data.description || "-"}
        </Text>
      </Text>
      <ManifestTile heading="manifest.quantity" value={data.quantity} />
      <ManifestTile heading="manifest.length" value={data.length} />
      <ManifestTile heading="manifest.width" value={data.width} />
      <ManifestTile heading="manifest.height" value={data.height} />
      <ManifestTile heading="manifest.weight" value={data.weight} />
    </Card>
  );
};

export const ManifestSection = ({ data }) => {
  if (data.type === BULK && data.items[0]) {
    return <Manifest data={data.items[0]} type={BULK} />;
  }
  if (data.items.length > 0) {
    return (
      <>
        <StyledCategoryHeader title="trip.manifest" />
        {data.items.map(item => {
          return <Manifest key={item.id} data={item} />;
        })}
      </>
    );
  }
  return null;
};
