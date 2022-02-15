import {
  CALENDAR_VIEW,
  CCDatePickerHeaderProps,
  CCDateTimePickerWeekValue
} from "../../../../types";
import React from "react";
import DateObject from "../../../../Utils";
import styled from "@emotion/styled";

const LDatePickerContainer = styled("div")`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;
const LPickerChevron = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  width: 18px;
  height: 18px;

  &:hover {
    background-color: #0277bd;
    color: #fff;
  }
`;
const LPicker = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  height: 18px;
  vertical-align: middle;

  &:hover {
    background-color: #0277bd;
    color: #fff;
  }
`;
const CCDatePickerHeader: React.FC<CCDatePickerHeaderProps> = (
  props: CCDatePickerHeaderProps
) => {
  const {
    value,
    view,
    onChange = () => {},
    onClickYear = () => {},
    onClickMonth = () => {}
  }: CCDatePickerHeaderProps = props;
  return (
    <>
      <LDatePickerContainer>
        <LPickerChevron
          onClick={() => {
            if (view === CALENDAR_VIEW.DAY) {
              onChange &&
                onChange(
                  new DateObject(value as Date)
                    .subtract("year", 1)
                    .toDate() as Date
                );
            }
            if (view === CALENDAR_VIEW.WEEK) {
              onChange &&
                onChange({
                  begin: new DateObject(
                    (value as CCDateTimePickerWeekValue).begin as Date
                  )
                    .subtract("year", 1)
                    .startOf("week")
                    .toDate() as Date,
                  end: new DateObject(
                    (value as CCDateTimePickerWeekValue).begin as Date
                  )
                    .subtract("year", 1)
                    .endOf("week")
                    .toDate() as Date
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
          {view === CALENDAR_VIEW.DAY
            ? new DateObject(value as Date).format("YYYY")
            : new DateObject(
                (value as CCDateTimePickerWeekValue).begin as Date
              ).format("YYYY")}
        </LPicker>
        <LPickerChevron
          onClick={() => {
            if (view === CALENDAR_VIEW.DAY) {
              onChange &&
                onChange(
                  new DateObject(value as Date).add("year", 1).toDate() as Date
                );
            }
            if (view === CALENDAR_VIEW.WEEK) {
              onChange &&
                onChange({
                  begin: new DateObject(
                    (value as CCDateTimePickerWeekValue).begin as Date
                  )
                    .add("year", 1)
                    .startOf("week")
                    .toDate() as Date,
                  end: new DateObject(
                    (value as CCDateTimePickerWeekValue).begin as Date
                  )
                    .add("year", 1)
                    .endOf("week")
                    .toDate() as Date
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
              onChange &&
                onChange(
                  new DateObject(value as Date)
                    .subtract("month", 1)
                    .toDate() as Date
                );
            }
            if (view === CALENDAR_VIEW.WEEK) {
              onChange &&
                onChange({
                  begin: new DateObject(
                    (value as CCDateTimePickerWeekValue).begin as Date
                  )
                    .subtract("month", 1)
                    .startOf("week")
                    .toDate() as Date,
                  end: new DateObject(
                    (value as CCDateTimePickerWeekValue).begin as Date
                  )
                    .subtract("month", 1)
                    .endOf("week")
                    .toDate() as Date
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
          {view === CALENDAR_VIEW.DAY
            ? new DateObject(value as Date).format("MMMM")
            : new DateObject(
                (value as CCDateTimePickerWeekValue).begin as Date
              ).format("MMMM")}
        </LPicker>
        <LPickerChevron
          onClick={() => {
            if (view === CALENDAR_VIEW.DAY) {
              onChange &&
                onChange(
                  new DateObject(value as Date).add("month", 1).toDate() as Date
                );
            }
            if (view === CALENDAR_VIEW.WEEK) {
              onChange &&
                onChange({
                  begin: new DateObject(
                    (value as CCDateTimePickerWeekValue).begin as Date
                  )
                    .add("month", 1)
                    .startOf("week")
                    .toDate() as Date,
                  end: new DateObject(
                    (value as CCDateTimePickerWeekValue).begin as Date
                  )
                    .add("month", 1)
                    .endOf("week")
                    .toDate() as Date
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
