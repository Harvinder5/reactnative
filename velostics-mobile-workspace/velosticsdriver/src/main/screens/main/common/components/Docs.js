/* eslint-disable global-require */
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo
} from "react";
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  View,
  ActivityIndicator
} from "react-native";
import Modal from "react-native-modal";
import ImageViewer from "react-native-image-zoom-viewer";

import Carousel from "react-native-snap-carousel";
import { showMessage, hideMessage } from "react-native-flash-message";
import axios from "axios";
import {
  Container,
  ImageContainer,
  DocImage,
  CarouselItemContainer,
  CarouselImage,
  ModalCloseButtonContainer,
  DocUploadImage
} from "./Docs.styles";
import { Card } from "@velostics/shared/src/uikit/layouts/layout";
import { Text } from "@velostics/shared";
import ImagePicker from "@velostics/shared/src/uikit/modals/ImagePicker";
import {
  STAGE_COMPLETED,
  STAGE_REQUEST,
  NavigationService
} from "@velostics/shared/src/settings";
import { CategoryHeader } from "@velostics/shared";
import ImageUpload from "@velostics/shared/src/uikit/datadisplay/ImageUpload";
const { width, height } = Dimensions.get("screen");
const filter = (_, index) => index !== 0;
const map = elm => ({ url: elm.url });

/**
 * Docs Types
 */
const OTHER_DOC = "other-documents";
const BOL = "bol";
const POD = "pod";
const RECEIPTS = "receipts";

/**
 * Image Types
 */
const MANIFEST = "manifest";
const TRUCK = "truck";
const OTHER_PHOTOS = "other-photos";

export const docsFilter = data => {
  return data.attachments
    .filter(
      elm =>
        elm.type === OTHER_DOC ||
        elm.type === BOL ||
        elm.type === POD ||
        elm.type === RECEIPTS
    )
    .map(elm => elm.url);
};
export const imageFilter = data => {
  return data.attachments
    .filter(
      elm =>
        elm.type === MANIFEST || elm.type === TRUCK || elm.type === OTHER_PHOTOS
    )
    .map(elm => elm.url);
};
export const bolFilter = data => {
  return data.attachments.filter(image => image.type === BOL);
};
export const getByImagesType = (data, type) => {
  return [
    require("../../../../../../assets/camtruck.png"),
    ...data.attachments.filter(image => image.type === type)
  ];
};
const Docs = ({ data, displayType }) => {
  const crousalRef = useRef(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shouldUpload, setShouldUpload] = useState(true);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isCarousalVisible, setIsCarousalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [bolImages, setBolImages] = useState(getByImagesType(data, BOL));
  const [podImages, setPodImages] = useState(getByImagesType(data, POD));
  const [receiptsImages, setReceiptsImages] = useState(
    getByImagesType(data, RECEIPTS)
  );
  const [otherDocs, setOtherDocs] = useState(getByImagesType(data, OTHER_DOC));
  /**
   * Image types
   */
  const [manifestImages, setManifestImages] = useState(
    getByImagesType(data, MANIFEST)
  );
  const [truckImages, setTruckImages] = useState(getByImagesType(data, TRUCK));
  const [otherImages, setOtherImages] = useState(
    getByImagesType(data, OTHER_PHOTOS)
  );
  useEffect(() => {
    if (data.stage === STAGE_COMPLETED || data.stage === STAGE_REQUEST) {
      setShouldUpload(false);
    }
  }, [data.stage]);

  const openModal = (index, type) => () => {
    console.log("opening");
    setSelectedType(type);
    if (index !== 0) {
      setSelectedIndex(index);
    }
  };
  const closeModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const getImageUrls = () => {
    if (selectedType === BOL) {
      return bolImages.filter(filter).map(map);
    } else if (selectedType === POD) {
      return podImages.filter(filter).map(map);
    } else if (selectedType === RECEIPTS) {
      return receiptsImages.filter(filter).map(map);
    } else if (selectedType === OTHER_DOC) {
      return otherDocs.filter(filter).map(map);
      /**
       * IMAGES
       */
    } else if (selectedType === MANIFEST) {
      return manifestImages.filter(filter).map(map);
    } else if (selectedType === TRUCK) {
      return truckImages.filter(filter).map(map);
    } else if (selectedType === OTHER_PHOTOS) {
      return otherImages.filter(filter).map(map);
    }
  };

  const onUpload = type => async ({ uri, mimetype }) => {
    const packet = {
      mimetype,
      url: uri,
      type: type,
      title: ""
    };
    if (type === BOL) {
      setBolImages([...bolImages, packet]);
    } else if (type === POD) {
      setPodImages([...podImages, packet]);
    } else if (type === RECEIPTS) {
      setReceiptsImages([...receiptsImages, packet]);
    } else if (type === OTHER_DOC) {
      setOtherDocs([...otherDocs, packet]);
      /**
       * Now the image types
       */
    } else if (type === MANIFEST) {
      setManifestImages([...manifestImages, packet]);
    } else if (type === TRUCK) {
      setTruckImages([...truckImages, packet]);
    } else {
      setOtherImages([...otherImages, packet]);
    }
    try {
      const response = await axios.patch(
        `/driver/shipments/${data.id}/attachments`,
        packet
      );
    } catch (e) {
      console.log(e);
      showMessage({
        message: e,
        type: "danger"
      });
    }
  };
  const closeImageModal = () => setSelectedIndex(null);
  const renderCarouselItem = ({ item }) => {
    return (
      <CarouselItemContainer>
        <CarouselImage source={{ uri: item }} />
      </CarouselItemContainer>
    );
  };

  const renderDoc = (image, index, type) => {
    if (data.stage === STAGE_COMPLETED || data.stage === STAGE_REQUEST) {
      if (index === 0) {
        return null;
      }
    }

    return index === 0 ? (
      <DocUploadImage
        key={index}
        style={{ width: "47%" }}
        onUpload={onUpload(type)}
        shouldUpdateImage={false}
      />
    ) : (
      <DocImage
        style={{ width: "47%" }}
        onPress={openModal(index, type)}
        key={index}
        source={index === 0 ? image : { uri: image.url }}
      />
    );
  };
  const renderContent = () => {
    if (displayType === "photos") {
      return (
        <>
          <>
            <ImageContainer>
              {manifestImages.length === 1 && data.stage === STAGE_COMPLETED ? (
                <></>
              ) : (
                <>
                  <CategoryHeader title="trip.photos.manifest" fullWidth />
                  {manifestImages.map((image, index) =>
                    renderDoc(image, index, MANIFEST)
                  )}
                </>
              )}
              {/* {manifestImages.map((image, index) =>
                renderDoc(image, index, MANIFEST)
              )} */}
            </ImageContainer>
          </>
          {truckImages.length === 1 && data.stage === STAGE_COMPLETED ? null : (
            <>
              <CategoryHeader title="trip.photos.truck" fullWidth />
              <ImageContainer>
                {truckImages.map((image, index) =>
                  renderDoc(image, index, TRUCK)
                )}
              </ImageContainer>
            </>
          )}
          {otherImages.length === 1 && data.stage === STAGE_COMPLETED ? null : (
            <>
              <CategoryHeader title="trip.photos.others" fullWidth />
              <ImageContainer>
                {otherImages.map((image, index) =>
                  renderDoc(image, index, OTHER_PHOTOS)
                )}
              </ImageContainer>
            </>
          )}
        </>
      );
    }
    return (
      <>
        {bolImages.length === 1 && data.stage === STAGE_COMPLETED ? null : (
          <>
            <CategoryHeader title="trip.docs.bol" fullWidth />
            <ImageContainer>
              {bolImages.map((image, index) => renderDoc(image, index, BOL))}
            </ImageContainer>
          </>
        )}
        {podImages.length === 1 && data.stage === STAGE_COMPLETED ? null : (
          <>
            <CategoryHeader title="trip.docs.pod" fullWidth />
            <ImageContainer>
              {podImages.map((image, index) => renderDoc(image, index, POD))}
            </ImageContainer>
          </>
        )}
        {receiptsImages.length === 1 &&
        data.stage === STAGE_COMPLETED ? null : (
          <>
            <CategoryHeader title="trip.docs.receipts" fullWidth />
            <ImageContainer>
              {receiptsImages.map((image, index) =>
                renderDoc(image, index, RECEIPTS)
              )}
            </ImageContainer>
          </>
        )}
        {otherDocs.length === 1 && data.stage === STAGE_COMPLETED ? null : (
          <>
            <CategoryHeader title="trip.docs.others" fullWidth />
            <ImageContainer>
              {otherDocs.map((image, index) =>
                renderDoc(image, index, OTHER_DOC)
              )}
            </ImageContainer>
          </>
        )}
      </>
    );
  };
  return (
    <Container>
      {shouldUpload && (
        <Text
          h6
          center
          margin="3px 25px 15px 25px"
          id="trip.docsuploadmessage"
          locale
        />
      )}
      {renderContent()}
      <ImagePicker
        isVisible={isModalVisible}
        onUpload={onUpload}
        onClose={closeModal}
      />
      <Modal
        isVisible={selectedIndex !== null}
        onBackdropPress={closeImageModal}
        onBackButtonPress={closeImageModal}
        style={{
          padding: 0,
          margin: 0
        }}
      >
        <ModalCloseButtonContainer onPress={closeImageModal}>
          <Text
            style={{
              fontSize: 35
            }}
            h1
            white
          >
            X
          </Text>
        </ModalCloseButtonContainer>
        <ImageViewer
          index={selectedIndex - 1}
          loadingRender={() => <ActivityIndicator size="large" />}
          enableSwipeDown
          onSwipeDown={closeImageModal}
          // imageUrls={truckImages
          //   .filter((_, index) => index !== 0)
          //   .map(elm => ({
          //     url: elm
          //   }))}
          imageUrls={getImageUrls()}
        />
      </Modal>
    </Container>
  );
};
const styles = StyleSheet.create({});
export default Docs;
