import React from "react";
import {
  CALENDAR_VIEW,
  CCDateTimePickerHeaderProps,
  PICKER_FEATURES
} from "../../types";
import styled from "@emotion/styled";
import DatePickerUtils from "../../Utils";

const LDateTimePickerHeaderContainer = styled("div", {
  label: "LDateTimePickerHeaderContainer"
})(({ theme }) => {
  return {
    backgroundColor: "#0277BD",
    paddingTop: 4,
    paddingBottom: 4
  };
});
const LDateTimePickerHeaderTypo = styled("div", {
  label: "LDateTimePickerHeaderTypo"
})(({ theme }) => {
  return {
    textAlign: "center",
    color: "#fff"
  };
});

function getHeaderTextDay(
  value: Date,
  features: Array<PICKER_FEATURES>
): string {
  if (!Boolean(features?.length > 0)) {
    return "";
  }
  if (
    features.includes(PICKER_FEATURES.DATE) &&
    features.includes(PICKER_FEATURES.TIME)
  ) {
    return DatePickerUtils.format(value, "LLLL");
  } else if (features.includes(PICKER_FEATURES.DATE)) {
    return DatePickerUtils.format(value, "LL");
  } else if (features.includes(PICKER_FEATURES.TIME)) {
    return DatePickerUtils.format(value, "LT");
  }
  return "";
}

function getHeaderText<T>(
  value: T | null,
  features: Array<PICKER_FEATURES>
): string {
  if (!Boolean(features?.length > 0)) {
    return "";
  }
  if (
    features.includes(PICKER_FEATURES.DATE) &&
    features.includes(PICKER_FEATURES.TIME)
  ) {
    return DatePickerUtils.format(value, "LLLL");
  } else if (features.includes(PICKER_FEATURES.DATE)) {
    return DatePickerUtils.format(value, "LL");
  } else if (features.includes(PICKER_FEATURES.TIME)) {
    return DatePickerUtils.format(value, "LT");
  }
  return "";
}

const CCDateTimePickerHeader: React.FC<CCDateTimePickerHeaderProps> = props => {
  const {
    value = props?.view === CALENDAR_VIEW.DAY
      ? new Date()
      : { begin: new Date(), end: new Date() },
    features = [PICKER_FEATURES.DATE],
    view = CALENDAR_VIEW.DAY
  }: CCDateTimePickerHeaderProps = props;
  // const headerText = useMemo(() => {
  //     if (view === CALENDAR_VIEW.DAY) {
  //         return getHeaderText<Date>(value, features);
  //     } else {
  //         return getHeaderText<CCDateTimePickerWeekValue>(value, features);
  //     }
  // }, [features, view, value]);

  return (
    <LDateTimePickerHeaderContainer>
      <LDateTimePickerHeaderTypo>{value}</LDateTimePickerHeaderTypo>
    </LDateTimePickerHeaderContainer>
  );
};
export default CCDateTimePickerHeader;
