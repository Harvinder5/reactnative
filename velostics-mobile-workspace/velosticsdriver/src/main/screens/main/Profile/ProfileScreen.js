import React, { useCallback, useContext, useEffect, useState } from "react";

import { Analytics, CustomIcon, Text } from "@velostics/shared";
import { handlePrivacyPolicyClick } from "@velostics/shared/src/settings/utilityFunctions";
import { driverInfoValidationSchema } from "@velostics/shared/src/settings/validators";
import { SmallButton, TextInput } from "@velostics/shared/src/uikit";
import { TextButton } from "@velostics/shared/src/uikit/buttons/Button";
import CategoryHeader from "@velostics/shared/src/uikit/datadisplay/CategoryHeader";
import { Card, Row } from "@velostics/shared/src/uikit/layouts/layout";
import ImagePicker from "@velostics/shared/src/uikit/modals/ImagePicker";
import WarningModal from "@velostics/shared/src/uikit/modals/WarningModal";
import NavBar from "@velostics/shared/src/uikit/navbar/NavBar";
import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { ScrollView, TouchableOpacity } from "react-native";
import codePush from "react-native-code-push";
import Dash from "react-native-dash";
import { Transition } from "react-navigation-fluid-transitions";

import { AuthStoreContext } from "../../../../stores/AuthStore";
import Avatar from "../../../components/Images/Avatar";
import {
  AvatarContainer,
  Container,
  EditButtonContainer,
  Header,
  InfoTileContainer,
  ProfileEditIconContainer,
  Separator,
  StatisticsContainer,
  StatisticsItemContainer
} from "./ProfileScreen.styles";

async function getAppVersion() {
  const [{ appVersion }, update] = await Promise.all([
    codePush.getConfiguration(),
    codePush.getUpdateMetadata()
  ]);

  if (!update) {
    return `v${appVersion}`;
  }

  const label = update.label.substring(1);
  return `v${appVersion} rev.${label}`;
}

const Statistics = () => {
  const authStore = useContext(AuthStoreContext);
  const renderItem = (heading, description) => {
    return (
      <StatisticsItemContainer>
        <Text h1 semiBold>
          {heading}
        </Text>
        <Text color="grey" h6 id={description} locale>
          {description}
        </Text>
      </StatisticsItemContainer>
    );
  };
  return (
    <StatisticsContainer>
      {renderItem(
        authStore.dashboardData.total_shipments || "-",
        "header.totaltrips"
      )}
      <Separator />
      {renderItem(
        authStore.dashboardData.total_miles || "-",
        "header.totalmiles"
      )}
      <Separator />
      {renderItem("-", "header.totalearnings")}
    </StatisticsContainer>
  );
};

const InfoTile = ({
  heading,
  description,
  lightPrimary,
  renderDescription,
  editMode,
  placeholder,
  onChange,
  inputProps,
  error
}) => {
  const renderContent = () => {
    if (editMode) {
      return (
        <TextInput
          {...inputProps}
          error={error}
          type="profile"
          placeholder={heading}
          onChangeText={onChange}
          value={description}
        />
      );
    } else if (renderDescription) {
      return renderDescription();
    }
    return (
      <Text
        margin="3px 0px 0px 0px"
        h5
        lightPrimary={lightPrimary}
        textTransform={
          getValue(["keyboardType"], inputProps) === "email-address"
            ? "lowercase"
            : "none"
        }
      >
        {description || "-"}
      </Text>
    );
  };
  return (
    <>
      <InfoTileContainer>
        <Text id={heading} locale font="primarySemiBold" h5 />
        {renderContent()}
      </InfoTileContainer>
    </>
  );
};
const DriverInfo = observer(({ data = {} }) => {
  const authStore = useContext(AuthStoreContext);
  const [initialValues, setInitialValues] = useState({
    name: data.name,
    l_name: data.l_name,
    driver: {
      licence: getValue(["driver", "licence"], data)
    },
    phone: data.phone,
    email: data.email
  });
  useEffect(() => {
    setInitialValues({
      name: data.name,
      l_name: data.l_name,
      driver: {
        licence: getValue(["driver", "licence"], data),
        ...(getValue(["driver", "id"], data) ? { id: data.driver.id } : {})
      },
      phone: data.phone,
      email: data.email
    });
    console.log(authStore.userData);
  }, [data]);
  const [driverLoading, setDriverLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const onSubmit = async values => {
    setDriverLoading(true);
    const response = await authStore.updateUser(values);
    if (response) {
      setEditMode(false);
      setDriverLoading(false);
    } else {
      setDriverLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={driverInfoValidationSchema}
    >
      {({ values, handleChange, resetForm, handleSubmit, errors, touched }) => {
        return (
          <>
            <CategoryHeader
              title="profilescreen.driverinfoheader"
              rightIcon="pen"
              renderRight={
                editMode
                  ? () => {
                      return (
                        <EditButtonContainer>
                          <SmallButton
                            title="profile.edit.cancel"
                            type="small"
                            onPress={() => {
                              resetForm(initialValues);
                              setEditMode(false);
                            }}
                          />
                          <SmallButton
                            title="profile.edit.save"
                            type="small"
                            loading={driverLoading}
                            onPress={handleSubmit}
                          />
                        </EditButtonContainer>
                      );
                    }
                  : null
              }
              onRightPress={() => setEditMode(!editMode)}
            />
            <Card>
              <InfoTile
                heading="profilescreen.drivername"
                description={values.name}
                onChange={handleChange("name")}
                editMode={editMode}
                error={
                  getValue(["name"], touched) && getValue(["name"], errors)
                }
              />
              <InfoTile
                heading="profilescreen.driverlastname"
                description={values.l_name}
                onChange={handleChange("l_name")}
                editMode={editMode}
                error={
                  getValue(["l_name"], touched) && getValue(["l_name"], errors)
                }
              />
              <InfoTile
                heading="profilescreen.driverlicense"
                description={values.driver.licence}
                error={
                  getValue(["driver", "licence"], touched) &&
                  getValue(["driver", "licence"], errors)
                }
                onChange={handleChange("driver.licence")}
                editMode={editMode}
              />
              <InfoTile
                heading="profilescreen.phoneno"
                description={values.phone}
                onChange={handleChange("phone")}
                error={
                  getValue(["phone"], touched) && getValue(["phone"], errors)
                }
                editMode={editMode}
                inputProps={{
                  keyboardType: "numeric",
                  maxLength: 13,
                  returnKeyType: "done"
                }}
              />
              <InfoTile
                heading="profilescreen.email"
                description={values.email}
                onChange={handleChange("email")}
                error={
                  getValue(["email"], touched) && getValue(["email"], errors)
                }
                editMode={editMode}
                inputProps={{
                  keyboardType: "email-address",
                  autoCapitalize: "none"
                }}
              />
            </Card>
          </>
        );
      }}
    </Formik>
  );
});

const RenderDash = () => {
  return (
    <Dash
      style={{ width: "100%", alignSelf: "center", marginVertical: 8 }}
      dashThickness={1}
      dashColor={"#b2b2b2"}
    />
  );
};
const ProfileScreen = ({ navigation }) => {
  const authStore = useContext(AuthStoreContext);
  const language = authStore.currentLanguage;
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [isImagePickerVisible, setIsImagePickerVisible] = useState(false);
  const [codepushVersion, setCodepushVersion] = useState("Loading...");

  useEffect(() => {
    Analytics.screenView("Profile");
    try {
      (async () => {
        const appVersionText = await getAppVersion();
        setCodepushVersion(appVersionText);
      })();
      console.log("current lag");
      console.log(language);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onModalCancel = useCallback(() => {
    setIsWarningModalVisible(false);
  }, []);

  const onModalConfirm = useCallback(() => {
    setIsWarningModalVisible(false);
    authStore.logout(navigation);
  }, [authStore.logout]);

  const onProfilePictureUpload = useCallback(
    ({ url }) => {
      authStore.updateUser({ picture_url: url });
    },
    [authStore.updateUser]
  );

  const handleChangeLanguage = useCallback(
    language => () => {
      authStore.changeLanguage(language);
    },
    [authStore.changeLanguage]
  );

  const profilePic =
    authStore.userData.picture_url ||
    "https://images.unsplash.com/photo-1467400492058-1aad44d4bcd6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1190&q=80";

  return (
    <Container>
      <NavBar
        title="profilescreen.title"
        main
        lightPrimary
        color="childPrimary"
      />
      <ScrollView keyboardShouldPersistTaps="always">
        <Header source={require("../../../../../assets/road.png")} />
        <AvatarContainer>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProfilePhotoScreen", {
                url: profilePic
              })
            }
          >
            <Transition shared={profilePic}>
              <Avatar
                source={{
                  uri: profilePic
                }}
              />
            </Transition>
          </TouchableOpacity>
          <ProfileEditIconContainer
            onPress={() => setIsImagePickerVisible(true)}
          >
            <CustomIcon name="pen" lightPrimary />
          </ProfileEditIconContainer>
        </AvatarContainer>
        <Text h3 semiBold center margin="15px 0px 10px 0px">
          {authStore.userData && authStore.userData.name}
        </Text>

        <Statistics data={authStore.userData} />
        <DriverInfo data={authStore.userData} />
        {/* <TruckInfo data={authStore.userData} /> */}
        {/* <TruckPhotos data={authStore.userData} /> */}

        <CategoryHeader title="profilescreen.changelanguage" />
        <Card>
          <TextButton
            id="profilescreen.lang.en"
            locale
            onPress={handleChangeLanguage("en")}
            marginVertical={10}
          />
          <TextButton
            id="profilescreen.lang.es"
            locale
            onPress={handleChangeLanguage("es")}
          />
        </Card>
        <Card>
          {/* <RenderDash /> */}

          <TextButton
            id="profilescreen.logout"
            locale
            onPress={() => setIsWarningModalVisible(true)}
          />
        </Card>

        <Row aic center>
          <TextButton
            h6
            title="signin.privacypolicy"
            onPress={handlePrivacyPolicyClick}
          />
          <Text size="h6">
            {" "}
            <Text size="h6" locale id="profilescreen.lastupdated" /> 10/4/2019,
            {codepushVersion}
          </Text>
        </Row>
      </ScrollView>
      <WarningModal
        isVisible={isWarningModalVisible}
        onConfirm={onModalConfirm}
        onCancel={onModalCancel}
      />
      <ImagePicker
        isVisible={isImagePickerVisible}
        onUpload={onProfilePictureUpload}
        onClose={() => setIsImagePickerVisible(false)}
      />
    </Container>
  );
};
export default observer(ProfileScreen);
