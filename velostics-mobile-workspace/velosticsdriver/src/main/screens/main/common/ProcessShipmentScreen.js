import React from "react";
import { FlatList, ScrollView } from "react-native";
import axios from "axios";
import { Formik, FieldArray } from "formik";
import { showMessage, hideMessage } from "react-native-flash-message";
import { Container, HeaderText } from "./ProcessShipmentScreen.styles";
import VerifyListTile from "@velostics/shared/src/uikit/listtiles/VerifyListTile";
import { NavBar, Button, Text, Analytics } from "@velostics/shared";
import { ShipmentsContext } from "../../../../stores/ShipmentsStore";
import camSelected from "../../../../../assets/cam_process_selected.png";
import camNotSelected from "../../../../../assets/cam_process.png";
import tickNotSelected from "../../../../../assets/tick_process.png";
import tickSelected from "../../../../../assets/tick_process_selected.png";
import imagePlaceholder from "../../../../../assets/camtruck.png";
import WarningModal from "@velostics/shared/src/uikit/modals/WarningModal";
import {
  STAGE_SCHEDULED,
  STAGE_REQUEST,
  STAGE_ENROUTE_TO_PICKUP,
  STATUS_ON_DELAYED,
  STATUS_ON_SCHEDULED,
  STATUS_ARRIVED,
  STAGE_LOADING,
  STAGE_ENROUTE_TO_DESTINATION,
  STAGE_UNLOADING,
  STAGE_COMPLETED,
  BULK,
  MATERIAL
} from "@velostics/shared/src/settings";
import { Observer } from "mobx-react-lite";
const PRE_LOADING = "pre_loading";
const POST_LOADING = "post_loading";

const getInitialValues = shipment => {
  if (shipment.type === BULK && shipment.stage === STAGE_LOADING) {
    return shipment.procedures.pre_loading;
  } else if (shipment.type === BULK && shipment.stage === STAGE_UNLOADING) {
    return shipment.procedures.post_loading;
  } else if (shipment.type === MATERIAL && shipment.stage === STAGE_LOADING) {
    return shipment.procedures.pre_loading;
  }
  return shipment.procedures.post_loading;
};
class ProcessShipmentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // processingData: data,
      loading: false,
      selectionFlag: false,
      shipmentType: this.props.navigation.getParam("type"),
      isModalVisible: false,
      initialValues: getInitialValues(
        this.props.navigation.getParam("shipment")
      )
    };
  }

  onSubmit = async values => {
    const shipment = this.props.navigation.getParam("shipment");
    let processFlag = false;
    try {
      const params = values.stages.map((stage, index) => {
        const _data = stage.data.map((elm, _index) => {
          if (
            elm.value !==
            this.state.initialValues.stages[index].data[_index].value
          ) {
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
      this.setState({ loading: true });
      console.log(params);
      const {
        data
      } = await axios.patch(
        `/dashboard/shipments/${shipment.id}/${shipment.procedure_status}`,
        { stages: params }
      );
      if (processFlag) {
        Analytics.action(Analytics.PROCEDURE_FILLED);
      } else {
        Analytics.action(Analytics.PROCEDURE_SKIPPED);
      }
      // this.props.navigation.pop();
      this.setState({ isModalVisible: true });
    } catch (e) {
      console.log(e);
      showMessage({
        message: e,
        type: "danger"
      });
      this.setState({ loading: false });
      console.log(e);
    }
  };
  handleModalClick = () => {
    const shipment = this.props.navigation.getParam("shipment");

    if (shipment.procedure_status === PRE_LOADING) {
      this.context.updateTripAsync(
        shipment.id,
        { stage: STAGE_ENROUTE_TO_DESTINATION },
        () => this.setState({ isModalVisible: false }),
        true
      );
    } else if (shipment.procedure_status === POST_LOADING) {
      this.context.updateTripAsync(
        shipment.id,
        { stage: STAGE_COMPLETED },
        () => this.setState({ isModalVisible: false }),
        true
      );
    }
  };
  render() {
    const { processingData, selectionFlag } = this.state;
    const shipment = this.props.navigation.getParam("shipment");

    return (
      <Container>
        <NavBar title="processshipment.title" showBackText />
        <ScrollView style={{ flex: 1 }}>
          <Formik
            onSubmit={this.onSubmit}
            initialValues={this.state.initialValues}
          >
            {({ handleSubmit, handleChange, values }) => {
              return (
                <FieldArray
                  name="stages"
                  render={arrayHelpers => {
                    return values.stages.map((stage, stageIndex) => {
                      return (
                        <React.Fragment key={stageIndex}>
                          <HeaderText key={`header${stageIndex}`}>
                            {stage.stage_number}: {stage.stage_title}{" "}
                          </HeaderText>
                          <FieldArray
                            key={`fieldarray${stageIndex}`}
                            name={`stages.${stageIndex}.data`}
                            render={arrayHelpers => {
                              return stage.data.map((item, index) => {
                                console.log(item);
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

                                    // onChange
                                    // selected={item.selected}
                                    // camera={item.camera}
                                  />
                                );
                              });
                            }}
                          />
                          <Button
                            loading={this.state.loading}
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

          <Observer>
            {() => {
              return (
                <WarningModal
                  loading={
                    this.context.shipmentUpdateLoading.find(
                      elm => elm === shipment.id
                    )
                      ? true
                      : false
                  }
                  title={`processshipment.${shipment.procedure_status}.title`}
                  // confirmText="processshipment.yes"
                  // cancelText="processshipment.no"
                  isVisible={this.state.isModalVisible}
                  shouldCancel={false}
                  onConfirm={this.handleModalClick}
                  onCancel={() => {
                    this.setState({ isModalVisible: false });
                    this.props.navigation.pop();
                  }}
                />
              );
            }}
          </Observer>
        </ScrollView>
      </Container>
    );
  }
}
ProcessShipmentScreen.contextType = ShipmentsContext;

export default ProcessShipmentScreen;
