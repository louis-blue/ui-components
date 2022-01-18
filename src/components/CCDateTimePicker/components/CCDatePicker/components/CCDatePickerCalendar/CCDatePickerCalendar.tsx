import React from "react";
import { CCDatePickerCalendarProps } from "../../../../types";
import styled from "@emotion/styled";
import CCDatePickerCalendarHeader from "./components/CCDatePickerCalendarHeader";

const LDatePickerWeekHeaderContainer = styled("div", {
  label: "LDatePickerWeekHeaderContainer"
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
      alignItems,
      userSelect: "none"
    };
  }
);

const CCDatePickerCalendar: React.FC<CCDatePickerCalendarProps> = (
  props: CCDatePickerCalendarProps
) => {
  const { value, onChange, view }: CCDatePickerCalendarProps = props;
  return (
    <LDatePickerWeekHeaderContainer
      fullWidth={true}
      justifyContent={"space-between"}
    >
      <CCDatePickerCalendarHeader />
    </LDatePickerWeekHeaderContainer>
  );
};

export default CCDatePickerCalendar;
