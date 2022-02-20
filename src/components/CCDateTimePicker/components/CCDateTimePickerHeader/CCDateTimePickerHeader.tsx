import React, { useMemo } from "react";
import {
  CALENDAR_VIEW,
  CCDateTimePickerHeaderProps,
  CCDateTimePickerWeekValue,
  PICKER_FEATURES
} from "../../types";
import styled from "@emotion/styled";
import { DateObject } from "../../../../Utils";

const LDateTimePickerHeaderContainer = styled("div", {
  label: "LDateTimePickerHeaderContainer"
})(({ theme }) => {
  return {
    width: "100%",
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

function _getTextFromDate<T>(
  value: T | null,
  features: Array<PICKER_FEATURES>,
  view: CALENDAR_VIEW,
  format: string
): string {
  if (view === CALENDAR_VIEW.DAY) {
    return new DateObject(value as Date | null).format(format);
  }
  if (view === CALENDAR_VIEW.WEEK) {
    return `${new DateObject(
      (value as CCDateTimePickerWeekValue | null)?.begin as Date | null
    ).format(format)} ~ ${new DateObject(
      (value as CCDateTimePickerWeekValue | null)?.end as Date | null
    ).format(format)}`;
  }
  return "";
}

function getHeaderText<T>(
  value: T | null,
  features: Array<PICKER_FEATURES>,
  view: CALENDAR_VIEW
): string {
  if (!Boolean(features?.length > 0)) {
    return "";
  }
  if (
    features.includes(PICKER_FEATURES.DATE) &&
    features.includes(PICKER_FEATURES.TIME)
  ) {
    return _getTextFromDate(value, features, view, "LLLL");
  } else if (features.includes(PICKER_FEATURES.DATE)) {
    return _getTextFromDate(value, features, view, "LL");
  } else if (features.includes(PICKER_FEATURES.TIME)) {
    return _getTextFromDate(value, features, view, "LT");
  }
  return "";
}

const CCDateTimePickerHeader: React.FC<CCDateTimePickerHeaderProps> = props => {
  const {
    value,
    features = [PICKER_FEATURES.DATE],
    view = CALENDAR_VIEW.DAY
  }: CCDateTimePickerHeaderProps = props;
  const headerText = useMemo(() => {
    return getHeaderText(value, features, view);
  }, [features, view, value]);
  return (
    <LDateTimePickerHeaderContainer>
      <LDateTimePickerHeaderTypo>{headerText}</LDateTimePickerHeaderTypo>
    </LDateTimePickerHeaderContainer>
  );
};

export default CCDateTimePickerHeader;
