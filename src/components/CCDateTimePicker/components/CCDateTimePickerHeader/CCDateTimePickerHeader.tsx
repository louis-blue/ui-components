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

function isCCDateTimePickerWeekValue(
  arg: any
): arg is CCDateTimePickerWeekValue {
  return "begin" in arg && "end" in arg;
}

function _getTextFromDate<T extends Date | CCDateTimePickerWeekValue>(
  value: T,
  features: Array<PICKER_FEATURES>,
  view: CALENDAR_VIEW,
  format: string
): string {
  if (value instanceof Date) {
    return new DateObject(value).format(format);
  }
  if (isCCDateTimePickerWeekValue(value)) {
    return `${new DateObject(value.begin).format(format)} ~ ${new DateObject(
      value.end
    ).format(format)}`;
  }

  // if (typeof value === "object") {
  //   return `${new DateObject(
  //     (value as CCDateTimePickerWeekValue)?.begin as Date | null
  //   ).format(format)} ~ ${new DateObject(
  //     (value as CCDateTimePickerWeekValue)?.end as Date | null
  //   ).format(format)}`;
  // }
  // if (view === CALENDAR_VIEW.DAY) {
  // }
  // if (view === CALENDAR_VIEW.WEEK) {
  //   return `${new DateObject(
  //     (value as CCDateTimePickerWeekValue | null)?.begin as Date | null
  //   ).format(format)} ~ ${new DateObject(
  //     (value as CCDateTimePickerWeekValue | null)?.end as Date | null
  //   ).format(format)}`;
  // }
  return "";
}

function getHeaderText<T extends Date | CCDateTimePickerWeekValue>(
  value: T,
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
    return _getTextFromDate<T>(value, features, view, "LLLL");
  } else if (features.includes(PICKER_FEATURES.DATE)) {
    return _getTextFromDate<T>(value, features, view, "LL");
  } else if (features.includes(PICKER_FEATURES.TIME)) {
    return _getTextFromDate<T>(value, features, view, "LT");
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
    return getHeaderText<Date | CCDateTimePickerWeekValue>(
      value,
      features,
      view
    );
  }, [features, view, value]);
  return (
    <LDateTimePickerHeaderContainer>
      <LDateTimePickerHeaderTypo>{headerText}</LDateTimePickerHeaderTypo>
    </LDateTimePickerHeaderContainer>
  );
};

export default CCDateTimePickerHeader;
