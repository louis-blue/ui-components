import PropTypes from "prop-types";
import React from "react";
import { CCDialog } from "../../components";
import { CALENDAR_VIEW, CCDateTimePickerProps, PICKER_FEATURES } from "./types";
import styled from "@emotion/styled";
import { CCDateTimePickerHeader } from "./components";

const LDatePickerHeader = styled("div", {
  label: "LDialogContainer"
})(({ theme }) => {
  return {
    padding: 0,
    overflow: "hidden",
    backgroundColor: "#0277BD"
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
      width={300}
    >
      <LDatePickerHeader>
        <CCDateTimePickerHeader value={value} features={features} view={view} />
      </LDatePickerHeader>
      {/*<div className={classes.dialogTitle}>*/}
      {/*    <CCDatePickerHeader type={"date"} value={value} />*/}
      {/*</div>*/}
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
