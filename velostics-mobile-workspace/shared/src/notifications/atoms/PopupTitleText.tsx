import styled from "styled-components/native";

import { Text } from "@velostics/shared/src/uikit/text/Text";

export const PopupTitleText = styled(Text).attrs({ numberOfLines: 1 })({
  color: "#333",
  fontSize: 16,
  fontWeight: "bold",
  lineHeight: 16,
  marginBottom: 4
});
