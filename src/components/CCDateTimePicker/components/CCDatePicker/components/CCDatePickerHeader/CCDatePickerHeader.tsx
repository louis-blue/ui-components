import {
  CALENDAR_VIEW,
  CCDatePickerHeaderProps,
  isDateTimePickerWeekValue
} from "../../../../types";
import React from "react";
import { DateObject } from "../../../../../../Utils";
import styled from "@emotion/styled";

const LDatePickerContainer = styled("div")(() => ({
  display: "flex",
  flexWrap: "nowrap",
  alignItems: "center",
  justifyContent: "center"
}));
const LPickerChevron = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  userSelect: "none",
  width: 18,
  height: 18,
  "&:hover": {
    backgroundColor: "#0277bd",
    color: "#fff"
  }
}));
const LPicker = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  userSelect: "none",
  height: 18,
  verticalAlign: "middle",
  "&:hover": {
    backgroundColor: "#0277bd",
    color: "#fff"
  }
}));

const CCDatePickerHeader: React.FC<CCDatePickerHeaderProps> = props => {
  const {
    value,
    view,
    onChange = () => {},
    onClickYear = () => {},
    onClickMonth = () => {}
  } = props;
  return (
    <>
      <LDatePickerContainer>
        <LPickerChevron
          onClick={() => {
            if (view === CALENDAR_VIEW.DAY) {
              if (!(value instanceof Date)) {
                return false;
              }
              onChange &&
                onChange(new DateObject(value).subtract("year", 1).toDate());
            }
            if (view === CALENDAR_VIEW.WEEK) {
              if (!isDateTimePickerWeekValue(value)) {
                return false;
              }
              onChange &&
                onChange({
                  begin: new DateObject(value.begin)
                    .subtract("year", 1)
                    .startOf("week")
                    .toDate(),
                  end: new DateObject(value.begin)
                    .subtract("year", 1)
                    .endOf("week")
                    .toDate()
                });
            }
          }}
        >
          {"<"}
        </LPickerChevron>
        <LPicker
          onClick={e => {
            onClickYear();
          }}
        >
          {(() => {
            if (value instanceof Date) {
              return new DateObject(value).format("YYYY");
            } else if (isDateTimePickerWeekValue(value)) {
              new DateObject(value.begin).format("YYYY");
            } else {
              return "";
            }
          })()}
        </LPicker>
        <LPickerChevron
          onClick={() => {
            if (view === CALENDAR_VIEW.DAY) {
              if (!(value instanceof Date)) {
                return false;
              }
              onChange &&
                onChange(new DateObject(value).add("year", 1).toDate());
            }
            if (view === CALENDAR_VIEW.WEEK) {
              if (!isDateTimePickerWeekValue(value)) {
                return false;
              }
              onChange &&
                onChange({
                  begin: new DateObject(value.begin)
                    .add("year", 1)
                    .startOf("week")
                    .toDate(),
                  end: new DateObject(value.begin)
                    .add("year", 1)
                    .endOf("week")
                    .toDate()
                });
            }
          }}
        >
          {">"}
        </LPickerChevron>
      </LDatePickerContainer>
      <LDatePickerContainer>
        <LPickerChevron
          onClick={() => {
            if (view === CALENDAR_VIEW.DAY) {
              if (!(value instanceof Date)) {
                return false;
              }
              onChange &&
                onChange(new DateObject(value).subtract("month", 1).toDate());
            }
            if (view === CALENDAR_VIEW.WEEK) {
              if (!isDateTimePickerWeekValue(value)) {
                return false;
              }
              onChange &&
                onChange({
                  begin: new DateObject(value.begin)
                    .subtract("month", 1)
                    .startOf("week")
                    .toDate(),
                  end: new DateObject(value.begin)
                    .subtract("month", 1)
                    .endOf("week")
                    .toDate()
                });
            }
          }}
        >
          {"<"}
        </LPickerChevron>
        <LPicker
          onClick={() => {
            onClickMonth();
          }}
        >
          {(() => {
            if (value instanceof Date) {
              return new DateObject(value).format("MMMM");
            }
            if (isDateTimePickerWeekValue(value)) {
              return new DateObject(value.begin).format("MMMM");
            }
          })()}
        </LPicker>
        <LPickerChevron
          onClick={() => {
            if (view === CALENDAR_VIEW.DAY) {
              if (!(value instanceof Date)) {
                return false;
              }
              onChange &&
                onChange(new DateObject(value).add("month", 1).toDate());
            }
            if (view === CALENDAR_VIEW.WEEK) {
              if (!isDateTimePickerWeekValue(value)) {
                return false;
              }
              onChange &&
                onChange({
                  begin: new DateObject(value.begin)
                    .add("month", 1)
                    .startOf("week")
                    .toDate(),
                  end: new DateObject(value.begin)
                    .add("month", 1)
                    .endOf("week")
                    .toDate()
                });
            }
          }}
        >
          {">"}
        </LPickerChevron>
      </LDatePickerContainer>
    </>
  );
};

export default CCDatePickerHeader;
