import React, { useCallback, useEffect, useState } from "react";
import { CCDialog } from "../../components";
import { CALENDAR_VIEW, CCDateTimePickerProps, PICKER_FEATURES } from "./types";
import styled from "@emotion/styled";
import { CCDatePicker, CCDateTimePickerHeader } from "./components";
import CCTimePicker from "./components/CCTimePicker";

const LDateTimePickerHeader = styled("div", {
  label: "LDateTimePickerHeader"
})`
  padding: 0;
  overflow: hidden;
  background-color: #0277bd;
  width: 100%;
`;

const LDateTimePickerContent = styled("div", {
  label: "LDateTimePickerContent"
})<{ features: Array<PICKER_FEATURES> }>`
  padding: 0;
  background-color: #fff;
  display: grid;
  grid-template-columns: ${props =>
    props.features?.length > 0
      ? `repeat(${props.features.length},1fr)`
      : `1fr`};
  width: 100%;
`;

const LDateTimePickerAction = styled("div", {
  label: "LDateTimePickerAction"
})<{ features: Array<PICKER_FEATURES> }>`
  padding: 8px;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const CCDateTimePicker: React.FC<CCDateTimePickerProps> = props => {
  const {
    open,
    onClose,
    value: propsValue,
    onChange,
    disabledMeridiem,
    features,
    view,
    step
  }: CCDateTimePickerProps = props;
  const [value, setValue] = useState(propsValue);
  useEffect(() => {
    setValue(propsValue);
  }, [propsValue]);
  const handleChange = useCallback(
    value => {
      onChange?.(value);
    },
    [onChange]
  );
  return (
    <CCDialog
      open={open}
      onClose={() => {
        onClose && onClose();
      }}
    >
      <LDateTimePickerHeader>
        <CCDateTimePickerHeader value={value} features={features} view={view} />
      </LDateTimePickerHeader>
      <LDateTimePickerContent features={features}>
        {features.includes(PICKER_FEATURES.DATE) && (
          <CCDatePicker
            value={value}
            onChange={e => {
              setValue(e);
            }}
            view={view}
          />
        )}
        {view === CALENDAR_VIEW.DAY &&
          features.includes(PICKER_FEATURES.TIME) &&
          value instanceof Date && (
            <CCTimePicker
              disabledMeridiem={Boolean(disabledMeridiem)}
              step={step}
              value={value}
              onChange={e => {
                setValue(e);
              }}
            />
          )}
      </LDateTimePickerContent>
      <LDateTimePickerAction features={features}>
        <button
          onClick={() => {
            onClose?.();
          }}
        >
          {"Cancel"}
        </button>
        <button
          onClick={() => {
            handleChange(value);
          }}
        >
          {"Confirm"}
        </button>
      </LDateTimePickerAction>
    </CCDialog>
  );
};
CCDateTimePicker.defaultProps = {
  disabledMeridiem: false,
  view: CALENDAR_VIEW.DAY,
  step: 1,
  open: false
};

export default CCDateTimePicker;
