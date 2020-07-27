import React from "react";
import { StyledIcon, StyledCustomIcon } from "./Ui.styles";

const Icon = ({ ...rest }) => {
  return <StyledIcon {...rest} />;
};
const CustomIcon = ({ size = 20, ...rest }) => {
  return <StyledCustomIcon size={size} {...rest} />;
};
export { Icon, CustomIcon };
