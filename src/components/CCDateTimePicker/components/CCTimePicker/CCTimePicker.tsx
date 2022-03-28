import { CCTimePickerProps } from "../../types";
import React from "react";
import styled from "@emotion/styled";
import { CCTimePickerHourPicker, CCTimePickerMinutePicker } from "./components";
import CCTimePickerMeridiemPicker from "./components/CCTimePickerMeridiemPicker";

const LTimePickerContainer = styled("div", {
  label: "LDatePickerContainer"
})<{ width?: number | string; disabledMeridiem?: boolean }>(
  ({ theme, width = 310, disabledMeridiem = false }) => {
    return {
      position: "relative",
      width: width,
      boxSizing: "border-box",
      padding: 8,
      backgroundColor: "#fff",
      height: 316,
      display: "grid",
      gridTemplateColumns: Boolean(disabledMeridiem)
        ? "repeat(2, 1fr)"
        : "repeat(3, 1fr)",
      gridColumnGap: 8
    };
  }
);

const CCTimePicker: React.FC<CCTimePickerProps> = props => {
  const { value, onChange, disabledMeridiem = true, step } = props;
  return (
    <LTimePickerContainer disabledMeridiem={disabledMeridiem}>
      <CCTimePickerHourPicker
        value={value}
        onChange={onChange}
        disabledMeridiem={disabledMeridiem}
        step={step}
      />
      <CCTimePickerMinutePicker
        value={value}
        onChange={onChange}
        disabledMeridiem={disabledMeridiem}
        step={step}
      />
      {!Boolean(disabledMeridiem) && (
        <CCTimePickerMeridiemPicker
          value={value}
          onChange={onChange}
          disabledMeridiem={disabledMeridiem}
        />
      )}
    </LTimePickerContainer>
  );
};

export default CCTimePicker;
