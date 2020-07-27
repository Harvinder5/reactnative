import React, { useState, useContext } from "react";
import { StyleSheet, ScrollView, Modal } from "react-native";
import axios from "axios";
import { showMessage, hideMessage } from "react-native-flash-message";
import PropTypes from "prop-types";
import { Formik, FieldArray } from "formik";
import { Text, CustomIcon, Button, Analytics } from "@velostics/shared";
import VerifyListTile from "@velostics/shared/src/uikit/listtiles/VerifyListTile";
// import Modal from "react-native-modal";
import { BULK, MATERIAL, stageCodes } from "@velostics/shared/src/settings";
import {
  Container,
  HeaderContainer,
  HeaderContent,
  StepsContainer
} from "./ChecklistModal.styles";
import camSelected from "../../../../assets/cam_process_selected.png";
import camNotSelected from "../../../../assets/cam_process.png";
import tickNotSelected from "../../../../assets/tick_process.png";
import tickSelected from "../../../../assets/tick_process_selected.png";
import imagePlaceholder from "../../../../assets/camtruck.png";
import { ShipmentsContext } from "../../../stores/ShipmentsStore";

const getInitialValues = shipment => {
  if (shipment.type === BULK && shipment.stage === stageCodes.loading.code) {
    return shipment.procedures.pre_loading;
  } else if (
    shipment.type === BULK &&
    shipment.stage === stageCodes.unloading.code
  ) {
    return shipment.procedures.post_loading;
  } else if (
    shipment.type === MATERIAL &&
    shipment.stage === stageCodes.loading.code
  ) {
    return shipment.procedures.pre_loading;
  }
  return shipment.procedures.post_loading;
};
const Header = ({ close, data }) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Text
          lightPrimary
          size="h3"
          font="primarySemiBold"
          locale
          id={
            data.stage === stageCodes.loading.code
              ? "trip.checklist.loading.heading"
              : "trip.checklist.unloading.heading"
          }
        />
        <Text size="h6">{data.shipment_name}</Text>
      </HeaderContent>
      <CustomIcon
        size={16}
        name="cross"
        color="pureGrey"
        style={styles.cross}
        onPress={close}
      />
    </HeaderContainer>
  );
};
const Step = ({ number, title }) => {
  return (
    <Text lightPrimary>
      {number}: <Text id={title} locale />
    </Text>
  );
};
const Steps = () => {
  return (
    <StepsContainer>
      {["checklist.complete.title"].map((elm, index) => (
        <Step key={elm} number={index + 1} title={elm} />
      ))}
    </StepsContainer>
  );
};

const CheckListForm = ({ data: shipment, onComplete, close }) => {
  const shipmentStore = useContext(ShipmentsContext);
  const [initialValues, setInitialValues] = useState(
    getInitialValues(shipment)
  );
  const onSubmit = async (values, actions) => {
    let processFlag = false;
    actions.setSubmitting(true);
    try {
      const params = values.stages.map((stage, index) => {
        const _data = stage.data.map((elm, _index) => {
          if (elm.value !== initialValues.stages[index].data[_index].value) {
            processFlag = true;
            return {
              ...elm,
              is_new: true
            };
          }
          return elm;
        });

        return { ...stage, data: _data };
      });
      actions.setSubmitting(true);
      const {
        data
      } = await axios.patch(
        `/dashboard/shipments/${shipment.id}/${shipment.procedure_status}`,
        { stages: params }
      );
      console.log({ data });
      if (processFlag) {
        Analytics.action(Analytics.PROCEDURE_FILLED);
      } else {
        Analytics.action(Analytics.PROCEDURE_SKIPPED);
      }

      onComplete(data);
      shipmentStore.updateShipment(data);
      close();
    } catch (e) {
      console.log(e);
      showMessage({
        message: e,
        type: "danger"
      });
    } finally {
      actions.setSubmitting(true);
    }
  };
  return (
    <Formik
      enableReinitialize
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({ values, handleChange, isSubmitting, handleSubmit }) => {
        return (
          <FieldArray
            name="stages"
            render={arrayHelpers => {
              return values.stages.map((stage, stageIndex) => {
                return (
                  <React.Fragment key={stageIndex}>
                    <Text
                      font="primarySemiBold"
                      margin="5px"
                      key={`header${stageIndex}`}
                    >
                      {stage.stage_number}: {stage.stage_title}{" "}
                    </Text>
                    <FieldArray
                      key={`fieldarray${stageIndex}`}
                      name={`stages.${stageIndex}.data`}
                      render={arrayHelpers => {
                        return stage.data.map((item, index) => {
                          return (
                            <VerifyListTile
                              key={index}
                              imagePlaceholder={imagePlaceholder}
                              camSelected={camSelected}
                              camNotSelected={camNotSelected}
                              tickSelected={tickSelected}
                              tickNotSelected={tickNotSelected}
                              index={index + 1}
                              label={item.label}
                              description={item.description}
                              data={item}
                              onChange={value => {
                                console.log(value);
                                console.log(
                                  values.stages[stageIndex].data[index]
                                );
                                handleChange(
                                  `stages.${stageIndex}.data.${index}.value`
                                )(value);
                              }}
                            />
                          );
                        });
                      }}
                    />
                    <Button
                      loading={isSubmitting}
                      onPress={handleSubmit}
                      title="process.finished"
                      margin="25px 0px"
                      lightPrimary
                    />
                  </React.Fragment>
                );
              });
            }}
          />
        );
      }}
    </Formik>
  );
};
const CheckListModal = ({
  isVisible,
  data: shipment,
  close,
  onComplete,
  ...props
}) => {
  return (
    <Modal
      backdropOpacity={0.2}
      onBackButtonPress={close}
      // useNativeDriver
      transparent
      animationType="slide"
      style={styles.modal}
      visible={isVisible}
      onBackdropPress={close}
      {...props}
    >
      {shipment && (
        <Container>
          <Header close={close} data={shipment} />
          <Steps />
          <ScrollView style={{ flex: 1 }}>
            <CheckListForm
              data={shipment}
              onComplete={onComplete}
              close={close}
            />
          </ScrollView>
        </Container>
      )}
    </Modal>
  );
};
CheckListModal.defaultProps = {
  isVisible: false,
  onComplete: () => {}
};
CheckListModal.propTypes = {
  close: PropTypes.func.isRequired,
  onComplete: PropTypes.func,
  data: PropTypes.any.isRequired
};
const styles = StyleSheet.create({
  modal: {
    backgroundColor: "transparent",
    margin: 0, // This is the important for full screen.
    marginTop: 40,
    alignItems: undefined,
    justifyContent: undefined
  },
  cross: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 10
  }
});
export default CheckListModal;
