import { CCDatePickerCalendarSeriesProps } from "../../../../../../../../types";
import React, { useMemo } from "react";
import DateObject from "../../../../../../../../Utils";
import styled from "@emotion/styled";
import { CCDatePickerCalendarDayItem } from "./components";

const LSeriesContainer = styled("div", { label: "LSeriesContainer" })`
  display: flex;
  flex-wrap: nowrap;
`;

const CCDatePickerCalendarSeries: React.FC<CCDatePickerCalendarSeriesProps> = (
  props: CCDatePickerCalendarSeriesProps
) => {
  const {
    date,
    value,
    onChange,
    component,
    view
  }: CCDatePickerCalendarSeriesProps = props;
  const range: Array<Date> = useMemo(() => {
    let res: Array<Date> = [];
    let _start: DateObject = new DateObject(date as Date)
      .startOf("week")
      .startOf("day");
    let _end: DateObject = new DateObject(date as Date)
      .endOf("week")
      .startOf("day");
    do {
      res.push(_start.toDate());
      _start = _start.add("day", 1).startOf("day");
    } while (_start.isSameOrBefore(_end));
    return res;
  }, [date]);
  // console.log("CCDatePickerCalendarSeries", range.toString());
  return (
    <LSeriesContainer data-date={date.toLocaleString()}>
      {range.map(day => {
        return (
          <CCDatePickerCalendarDayItem
            key={day.toLocaleString()}
            date={day}
            value={value}
            onChange={onChange}
            component={component}
            view={view}
          >
            {new DateObject(day).format("D")}
          </CCDatePickerCalendarDayItem>
        );
      })}
    </LSeriesContainer>
  );
};

export default CCDatePickerCalendarSeries;
