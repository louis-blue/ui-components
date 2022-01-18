import PropTypes from "prop-types";
import React from "react";
import { CCDialog } from "../../components";
import { CALENDAR_VIEW, CCDateTimePickerProps, PICKER_FEATURES } from "./types";
import styled from "@emotion/styled";
import { CCDatePicker, CCDateTimePickerHeader } from "./components";

const DIALOG_WIDTH = 310;
const LDateTimePickerHeader = styled("div", {
  label: "LDateTimePickerHeader"
})(({ theme }) => {
  return {
    padding: 0,
    overflow: "hidden",
    backgroundColor: "#0277BD"
  };
});
const LDateTimePickerContent = styled("div", {
  label: "LDateTimePickerContent"
})(({ theme }) => {
  return {
    padding: 0,
    backgroundColor: "#fff"
  };
});

const CCDateTimePicker: React.FC<CCDateTimePickerProps> = props => {
  const {
    open,
    onClose,
    value,
    onChange,
    features = [PICKER_FEATURES.DATE],
    view = CALENDAR_VIEW.DAY,
    ...others
  }: CCDateTimePickerProps = props;

  return (
    <CCDialog
      open={open}
      onClose={() => {
        onClose && onClose();
      }}
      width={DIALOG_WIDTH}
    >
      <LDateTimePickerHeader>
        <CCDateTimePickerHeader value={value} features={features} view={view} />
      </LDateTimePickerHeader>
      <LDateTimePickerContent>
        <CCDatePicker value={value} onChange={onChange} view={view} />
      </LDateTimePickerContent>
      {/*<div className={classes.dialogContent}>*/}
      {/*    <CCCalendarPicker />*/}
      {/*</div>*/}
    </CCDialog>
  );
};

CCDateTimePicker.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date)]),
  onChange: PropTypes.func
};

export default CCDateTimePicker;
