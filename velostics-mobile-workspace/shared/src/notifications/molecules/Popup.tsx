import React, { ComponentProps, FC } from "react";

import { PopupContainer } from "../atoms/PopupContainer";
import { PopupContentContainer } from "../atoms/PopupContentContainer";
import { PopupContentText } from "../atoms/PopupContentText";
import { PopupTitleContainer } from "../atoms/PopupTitleContainer";
import { PopupTitleText } from "../atoms/PopupTitleText";
import { PopupTitleTextContainer } from "../atoms/PopupTitleTextContainer";

type PopupProps = {
  title: string;
  children: ComponentProps<typeof PopupContentText>["children"];
};

export const Popup: FC<PopupProps> = ({ title, children }) => (
  <PopupContainer>
    <PopupContentContainer>
      <PopupTitleContainer>
        <PopupTitleTextContainer>
          <PopupTitleText>{title}</PopupTitleText>
        </PopupTitleTextContainer>
      </PopupTitleContainer>
      <PopupContentContainer>
        <PopupContentText>{children}</PopupContentText>
      </PopupContentContainer>
    </PopupContentContainer>
  </PopupContainer>
);
