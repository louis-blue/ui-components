import React, { useCallback } from "react";
import {
  CALENDAR_VIEW,
  CCCCDatePickerMonthPickerProps,
  CCDateTimePickerWeekValue
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

const CCDatePickerMonthPicker: React.FC<CCCCDatePickerMonthPickerProps> = (
  props: CCCCDatePickerMonthPickerProps
) => {
  const {
    value,
    open,
    view,
    onChange = () => {}
  }: CCCCDatePickerMonthPickerProps = props;

  const isCurrent = useCallback(
    month => {
      return (
        new DateObject(
          view === CALENDAR_VIEW.DAY
            ? (value as Date)
            : ((value as CCDateTimePickerWeekValue).begin as Date)
        ).month === month
      );
    },
    [view, value]
  );
  return (
    <LMothPickerContainer open={open}>
      {DateObject.monthFormat.map((item: string, index: number) => {
        return (
          <LMothPickerItemContainer
            key={item}
            isCurrent={isCurrent(index)}
            onClick={e => {
              if (view === CALENDAR_VIEW.DAY) {
                onChange(
                  new DateObject(value as Date)
                    .setMonth(Number(index))
                    .toDate() as Date
                );
              }
              if (view === CALENDAR_VIEW.WEEK) {
                onChange({
                  begin: new DateObject(
                    (value as CCDateTimePickerWeekValue).begin as Date
                  )
                    .setMonth(Number(index))
                    .startOf("week")
                    .toDate() as Date,
                  end: new DateObject(
                    (value as CCDateTimePickerWeekValue).begin as Date
                  )
                    .setMonth(Number(index))
                    .endOf("week")
                    .toDate() as Date
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
