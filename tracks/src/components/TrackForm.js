import React, { useContext } from "react";
import { Input, Button } from "react-native-elements";
import Spacer from "./Spacer";
import { Context as LocationContext } from "../context/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";

const TrackForm = () => {
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName
  } = useContext(LocationContext);

  const [saveTrack] = useSaveTrack();
  // console.log(locations.length);

  return (
    <>
      <Spacer>
        <Input
          value={name}
          onChangeText={changeName}
          placeholder="Enter Name"
        />
      </Spacer>
      <Button
        title={recording ? "Stop " : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      <Spacer />
      {!recording && locations.length ? (
        <Button title="Save Recording" onPress={saveTrack} />
      ) : null}
    </>
  );
};

export default TrackForm;
