export const something = () => console.log("hi");
export const test = () => console.log("tesssßt");
import { CustomIcon } from "./src/utils/Expo/UI";
import Analytics from "./src/utils/Analytics";

import Button, { TextButton } from "./src/uikit/buttons/Button";
import NavBar from "./src/uikit/navbar/NavBar";
export * from "./src/settings/validators";
// theme
export * from "./src/settings/theme";
// Text, NumberText
export * from "./src/uikit/text/Text";
// CUSTOM ICON
export * from "./src/uikit/datadisplay";
export { CustomIcon, Button, TextButton, NavBar };
export { Analytics };
