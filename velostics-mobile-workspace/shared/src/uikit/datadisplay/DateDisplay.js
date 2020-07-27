import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import { Text } from "../text/Text";

const DateDisplay = ({ date }) => {
  if (!date) {
    return <Text font="primarySemiBold">-</Text>;
  }
  return <Text font="primary">{format(date, "MM/DD/YYYY")}</Text>;
};

DateDisplay.propTypes = {
  date: PropTypes.any
};
export default DateDisplay;
