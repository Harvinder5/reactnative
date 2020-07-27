import React from "react";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useIntl } from "react-intl";

const useBottomActionSheet = ({
  options,
  cancelButtonIndex,
  destructiveButtonIndex
}) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const intl = useIntl();

  const showBottomActionSheet = callback => {
    const sheetOptions = options.map(option =>
      intl.formatMessage({ id: option })
    );
    const cancelIndex = cancelButtonIndex || sheetOptions.length - 1;
    const descIndex = destructiveButtonIndex || sheetOptions.length - 1;

    showActionSheetWithOptions(
      {
        options: sheetOptions,
        cancelButtonIndex: cancelIndex,
        destructiveButtonIndex: descIndex
      },
      buttonIndex => {
        callback(buttonIndex);
      }
    );
  };

  return {
    showBottomActionSheet
  };
};

export default useBottomActionSheet;
