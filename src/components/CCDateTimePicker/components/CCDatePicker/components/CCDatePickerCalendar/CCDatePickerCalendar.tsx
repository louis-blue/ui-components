import React from "react";
import { CCDatePickerCalendarProps } from "../../../../types";
import styled from "@emotion/styled";
import CCDatePickerCalendarHeader from "./components/CCDatePickerCalendarHeader";
import CCDatePickerCalendarContents from "./components/CCDatePickerCalendarContents";

const LDatePickerContainer = styled("div", {
  label: "LDatePickerContainer",
  shouldForwardProp: propName => {
    switch (propName) {
      case "direction":
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
  direction?: string;
}>`
  user-select: none;
  height: ${props => props?.height || "auto"};
  width: ${props => (props?.fullWidth ? "100%" : "auto")};
  display: flex;
  justify-content: ${props => props?.justifyContent || "flex-start"};
  align-items: ${props => props?.alignItems || "flex-start"};
  flex-direction: ${props => props?.direction || "row"};
`;

const CCDatePickerCalendar: React.FC<CCDatePickerCalendarProps> = (
  props: CCDatePickerCalendarProps
) => {
  const { value, onChange, view, component }: CCDatePickerCalendarProps = props;
  return (
    <LDatePickerContainer direction={"column"}>
      <LDatePickerContainer fullWidth={true} justifyContent={"space-between"}>
        <CCDatePickerCalendarHeader />
      </LDatePickerContainer>
      <LDatePickerContainer direction={"column"}>
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
