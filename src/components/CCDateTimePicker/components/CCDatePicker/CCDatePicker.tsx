import { CCDatePickerProps } from "../../types";
import React from "react";
import styled from "@emotion/styled";
import CCDatePickerHeader from "./components/CCDatePickerHeader";
import { CCDatePickerCalendar } from "./components";

const LDatePickerContainer = styled("div", {
  label: "LDatePickerContainer"
})<{ width?: number | string }>(({ theme, width = 310 }) => {
  return {
    width: width,
    boxSizing: "border-box",
    padding: 8,
    backgroundColor: "#fff",
    height: 316
  };
});

const LDatePickerGridContainer = styled("div", {
  label: "LDatePickerGridContainer"
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
  const { value, onChange, view }: CCDatePickerProps = props;
  return (
    <LDatePickerContainer>
      <LDatePickerGridContainer
        fullWidth={true}
        height={30}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <CCDatePickerHeader value={value} onChange={onChange} view={view} />
      </LDatePickerGridContainer>
      <LDatePickerGridContainer justifyContent={"center"} alignItems={"center"}>
        <CCDatePickerCalendar value={value} onChange={onChange} view={view} />
      </LDatePickerGridContainer>
    </LDatePickerContainer>
  );
};
export default CCDatePicker;
