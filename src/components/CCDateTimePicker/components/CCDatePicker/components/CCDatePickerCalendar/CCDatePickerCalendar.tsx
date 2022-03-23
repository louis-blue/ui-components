import React from "react";
import { CCDatePickerCalendarProps } from "../../../../types";
import styled from "@emotion/styled";
import CCDatePickerCalendarHeader from "./components/CCDatePickerCalendarHeader";
import CCDatePickerCalendarContents from "./components/CCDatePickerCalendarContents";

const LDatePickerContainer = styled("div", {
  label: "LDatePickerContainer",
  shouldForwardProp: propName => {
    switch (propName) {
      case "flexDirection":
      case "justifyContent":
      case "fullWidth":
        return false;
      default:
        return true;
    }
  }
})<{
  justifyContent?: string;
  fullWidth?: boolean;
  flexDirection?: React.CSSProperties["flexDirection"];
}>(props => {
  const { justifyContent, fullWidth, flexDirection } = props;

  return {
    userSelect: "none",
    display: "flex",
    alignItems: "flex-start",
    width: fullWidth ? "100%" : "auto",
    flexDirection,
    justifyContent
  };
});

const CCDatePickerCalendar: React.FC<CCDatePickerCalendarProps> = (
  props: CCDatePickerCalendarProps
) => {
  const { value, onChange, view, component }: CCDatePickerCalendarProps = props;
  return (
    <LDatePickerContainer flexDirection={"column"}>
      <LDatePickerContainer fullWidth={true} justifyContent={"space-between"}>
        <CCDatePickerCalendarHeader />
      </LDatePickerContainer>
      <LDatePickerContainer flexDirection={"column"}>
        <CCDatePickerCalendarContents
          value={value}
          onChange={onChange}
          view={view}
          component={component}
        />
      </LDatePickerContainer>
    </LDatePickerContainer>
  );
};

export default CCDatePickerCalendar;
