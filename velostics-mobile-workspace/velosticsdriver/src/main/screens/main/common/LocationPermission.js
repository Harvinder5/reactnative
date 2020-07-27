import React from "react";
import * as Permissions from "expo-permissions";
import { Button } from "@velostics/shared";
import {
  Container,
  ButtonContainer,
  Header,
  ImageContent
} from "./components/Permissions";
import NavigationService from "@velostics/shared/src/settings/NavigationService";

const LocationPermission = () => {
  function setPermission() {
    Permissions.askAsync(Permissions.LOCATION);
    setTimeout(() => {
      NavigationService.navigate("App");
    }, 500);
  }
  return (
    <Container contentContainerStyle={{ flex: 1 }}>
      <Header
        title="location.permission.title"
        description="location.permission.description"
      />
      <ImageContent
        source={require("../../../../../assets/locationpermission.png")}
        message="location.permission.message"
      />
      <ButtonContainer>
        <Button
          expand
          title="location.button"
          lightPrimary
          onPress={setPermission}
        />
      </ButtonContainer>
    </Container>
  );
};

export default LocationPermission;
