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
  ModalCloseButtonContainer
} from "./Docs.styles";
import { Card } from "@velostics/shared/src/uikit/layouts/layout";
import { Text } from "@velostics/shared";
import ImagePicker from "@velostics/shared/src/uikit/modals/ImagePicker";
import { STAGE_COMPLETED, STAGE_REQUEST } from "@velostics/shared/src/settings";
import { CategoryHeader } from "@velostics/shared";
const { width, height } = Dimensions.get("screen");
const filter = (_, index) => index !== 0;
const map = elm => ({ url: elm.url });
const OTHER_DOC = "other-documents";
const BOL = "bol";
const POD = "pod";
const RECEIPTS = "receipts";
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
export const bolFilter = data => {
  return data.attachments.filter(image => image.type === BOL);
};
export const getByImagesType = (data, type) => {
  return [
    require("../../../../../../assets/camtruck.png"),
    ...data.attachments.filter(image => image.type === type)
  ];
};
const TripPhotoList = ({ data }) => {
  const crousalRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shouldUpload, setShouldUplaod] = useState(true);
  const [truckImages, setTruckImages] = useState([
    require("../../../../../../assets/camtruck.png"),
    ...docsFilter(data)
  ]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isCarousalVisible, setIsCarousalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [bolImages, setBolImages] = useState(getByImagesType(data, BOL));

  const [podImages, setPodImages] = useState(getByImagesType(data, POD));
  const [receiptsImages, setReceiptsImages] = useState(
    getByImagesType(data, RECEIPTS)
  );
  const [otherImages, setOtherImages] = useState(
    getByImagesType(data, OTHER_DOC)
  );

  useEffect(() => {
    if (data.stage === STAGE_COMPLETED || data.stage === STAGE_REQUEST) {
      setShouldUplaod(false);
    }
  }, [data.stage]);

  const handleUpload = (index, type) => () => {
    console.log(type);
    setSelectedType(type);
    if (index === 0) {
      setIsModalVisible(true);
    } else {
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
      return otherImages.filter(filter).map(map);
    }
  };

  const onUpload = async ({ url, mimetype }) => {
    const packet = {
      mimetype,
      url,
      type: selectedType,
      title: ""
    };
    setTruckImages([...truckImages, packet]);
    console.log(selectedType);
    if (selectedType === BOL) {
      setBolImages([...bolImages, packet]);
    } else if (selectedType === POD) {
      setPodImages([...podImages, packet]);
    } else if (selectedType === RECEIPTS) {
      setReceiptsImages([...receiptsImages, packet]);
    } else {
      setOtherImages([...otherImages, packet]);
    }
    try {
      const response = await axios.patch(
        `/driver/shipments/${data.id}/attachments`,
        packet
      );

      console.log(response.data);
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
    return (
      <TouchableOpacity
        key={index}
        onPress={handleUpload(index, type)}
        style={{ width: "47%" }}
      >
        <DocImage
          key={index}
          key={index}
          source={index === 0 ? image : { uri: image.url }}
        />
      </TouchableOpacity>
    );
  };
  if (data.stage === STAGE_COMPLETED || data.stage === STAGE_REQUEST) {
    if (truckImages.length === 1) {
      return null;
    }
  }

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
      <CategoryHeader title="trip.docs.bol" fullWidth />
      <ImageContainer>
        {bolImages.map((image, index) => renderDoc(image, index, BOL))}
      </ImageContainer>
      <CategoryHeader title="trip.docs.pod" fullWidth />
      <ImageContainer>
        {podImages.map((image, index) => renderDoc(image, index, POD))}
      </ImageContainer>
      <CategoryHeader title="trip.docs.receipts" fullWidth />
      <ImageContainer>
        {receiptsImages.map((image, index) =>
          renderDoc(image, index, RECEIPTS)
        )}
      </ImageContainer>
      <CategoryHeader title="trip.docs.others" fullWidth />

      <ImageContainer>
        {otherImages.map((image, index) => renderDoc(image, index, OTHER_DOC))}
      </ImageContainer>
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
          imageUrls={getImageUrls()}
        />
      </Modal>
    </Container>
  );
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
export default TripPhotoList;
