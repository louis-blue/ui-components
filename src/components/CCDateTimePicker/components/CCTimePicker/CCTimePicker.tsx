import { CCTimePickerProps } from "../../types";
import React from "react";
import styled from "@emotion/styled";
import { CCTimePickerHourPicker, CCTimePickerMinutePicker } from "./components";

const LTimePickerContainer = styled("div", {
  label: "LDatePickerContainer"
})<{ width?: number | string }>(({ theme, width = 310 }) => {
  return {
    position: "relative",
    width: width,
    boxSizing: "border-box",
    padding: 8,
    backgroundColor: "#fff",
    height: 316,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridColumnGap: 8
  };
});

const CCTimePicker: React.FC<CCTimePickerProps> = (
  props: CCTimePickerProps
) => {
  const {
    value,
    onChange,
    view,
    disabledMeridiem = true,
    step
  }: CCTimePickerProps = props;
  return (
    <LTimePickerContainer>
      <CCTimePickerHourPicker
        value={value}
        onChange={onChange}
        view={view}
        disabledMeridiem={disabledMeridiem}
        step={step}
      />
      <CCTimePickerMinutePicker
        value={value}
        onChange={onChange}
        view={view}
        disabledMeridiem={disabledMeridiem}
        step={step}
      />
    </LTimePickerContainer>
  );
};

export default CCTimePicker;
