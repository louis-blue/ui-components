import {
  CALENDAR_VIEW,
  CCDatePickerCalendarProps,
  CCDateTimePickerWeekValue
} from "../../../../../../types";
import React, { useMemo } from "react";
import styled from "@emotion/styled";
import DateObject from "../../../../../../Utils";
import { CCDatePickerCalendarSeries } from "./components";

const LWeekRow = styled("div", { label: "LWeekRow" })`
  display: flex;
  justify-content: center;
`;

const CCDatePickerCalendarContents: React.FC<CCDatePickerCalendarProps> = (
  props: CCDatePickerCalendarProps
) => {
  const { value, onChange, component, view }: CCDatePickerCalendarProps = props;
  const range: Array<Date> = useMemo(() => {
    let res: Array<Date> = [];
    let _start: DateObject =
      view === CALENDAR_VIEW.DAY
        ? new DateObject(value as Date).startOf("month")
        : new DateObject(
            (value as CCDateTimePickerWeekValue).begin as Date
          ).startOf("month");
    let _end: DateObject =
      view === CALENDAR_VIEW.DAY
        ? new DateObject(value as Date).endOf("month")
        : new DateObject(
            (value as CCDateTimePickerWeekValue).begin as Date
          ).endOf("month");
    do {
      res.push(_start.toDate());
      _start = _start.add("week", 1).startOf("week");
    } while (_start.isSameOrBefore(_end));
    return res;
  }, [value, view]);

  return (
    <>
      {range.map(date => {
        return (
          <LWeekRow key={date.toLocaleDateString()}>
            <CCDatePickerCalendarSeries
              date={date}
              value={value}
              view={view}
              onChange={onChange}
              component={component}
            />
          </LWeekRow>
        );
      })}
    </>
  );
};

export default CCDatePickerCalendarContents;
