import { CALENDAR_VIEW, CCDatePickerProps } from "../../types";
import React, { useState } from "react";
import CCDatePickerHeader from "./components/CCDatePickerHeader";
import {
  CCDatePickerCalendar,
  CCDatePickerMonthPicker,
  CCDatePickerYearPicker
} from "./components";
import styled from "@emotion/styled";

const LDatePickerContainer = styled("div", {
  label: "LDatePickerContainer"
})<{ width?: number | string }>(({ theme, width = 310 }) => {
  return {
    position: "relative",
    width: width,
    boxSizing: "border-box",
    padding: 8,
    backgroundColor: "#fff",
    height: 316
  };
});

const LDatePickerGridContainer = styled("div", {
  label: "LDatePickerGridContainer",
  shouldForwardProp(propName: string): boolean {
    switch (propName) {
      case "justifyContent":
      case "alignItems":
      case "fullWidth":
      case "height":
        return false;
      default:
        return true;
    }
  }
})<{
  justifyContent?: string;
  alignItems?: string;
  fullWidth?: boolean;
  height?: number | string;
}>(
  ({
    theme,
    fullWidth,
    height,
    justifyContent = "flex-start",
    alignItems = "flex-start"
  }) => {
    return {
      height: height,
      width: fullWidth ? "100%" : "auto",
      display: "flex",
      justifyContent,
      alignItems
    };
  }
);

const CCDatePicker: React.FC<CCDatePickerProps> = (
  props: CCDatePickerProps
) => {
  const {
    value,
    onChange,
    view = CALENDAR_VIEW.DAY
  }: CCDatePickerProps = props;
  const [yearPicker, setYearPicker] = useState(false);
  const [monthPicker, setMonthPicker] = useState(false);
  return (
    <LDatePickerContainer>
      <CCDatePickerYearPicker
        view={view}
        value={value}
        open={yearPicker}
        onChange={e => {
          setYearPicker(false);
          onChange && onChange(e);
        }}
      />
      <CCDatePickerMonthPicker
        open={monthPicker}
        value={value}
        view={view}
        onChange={e => {
          setMonthPicker(false);
          onChange && onChange(e);
        }}
      />
      <LDatePickerGridContainer
        fullWidth={true}
        height={30}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <CCDatePickerHeader
          value={value}
          onChange={onChange}
          view={view}
          onClickYear={() => {
            setYearPicker(true);
          }}
          onClickMonth={() => {
            setMonthPicker(true);
          }}
        />
      </LDatePickerGridContainer>
      <LDatePickerGridContainer justifyContent={"center"} alignItems={"center"}>
        <CCDatePickerCalendar value={value} onChange={onChange} view={view} />
      </LDatePickerGridContainer>
    </LDatePickerContainer>
  );
};
export default CCDatePicker;
