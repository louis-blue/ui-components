import React, { useCallback } from "react";
import {
  CCCCDatePickerMonthPickerProps,
  isDateTimePickerWeekValue
} from "../../../../types";
import styled from "@emotion/styled";
import { DateObject } from "../../../../../../Utils";

const LMothPickerContainer = styled("div")<{ open: boolean }>(({ open }) => ({
  display: open ? "grid" : "none",
  gridTemplateColumns: "repeat(3, 1fr)",
  backgroundColor: "#fff",
  width: "inherit",
  height: "inherit",
  position: "absolute",
  top: 0,
  left: 0,
  padding: 16,
  boxSizing: "border-box"
}));

const LMothPickerItemContainer = styled("div")<{ isCurrent: boolean }>(
  ({ isCurrent }) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    boxSizing: "border-box",
    borderRadius: 16,
    cursor: "pointer",
    backgroundColor: isCurrent ? "#00897b" : "transparent",
    color: isCurrent ? "#fff" : "inherit",
    "&:hover": {
      backgroundColor: "#0277bd",
      color: "#fff"
    }
  })
);

const CCDatePickerMonthPicker: React.FC<
  CCCCDatePickerMonthPickerProps
> = props => {
  const { value, open, view, onChange = () => {} } = props;

  const isCurrent = useCallback(
    month => {
      if (value instanceof Date) {
        return new DateObject(value).month === month;
      }
      if (isDateTimePickerWeekValue(value)) {
        return new DateObject(value.begin).month === month;
      }
      return false;
    },
    [value]
  );
  return (
    <LMothPickerContainer open={open}>
      {DateObject.monthFormat.map((item: string, index: number) => {
        return (
          <LMothPickerItemContainer
            key={item}
            isCurrent={isCurrent(index)}
            onClick={e => {
              if (value instanceof Date) {
                onChange(
                  new DateObject(value).setMonth(Number(index)).toDate()
                );
              }
              if (isDateTimePickerWeekValue(value)) {
                onChange({
                  begin: new DateObject(value.begin)
                    .setMonth(Number(index))
                    .startOf("week")
                    .toDate(),
                  end: new DateObject(value.begin)
                    .setMonth(Number(index))
                    .endOf("week")
                    .toDate()
                });
              }
            }}
          >
            {item}
          </LMothPickerItemContainer>
        );
      })}
    </LMothPickerContainer>
  );
};
export default CCDatePickerMonthPicker;
