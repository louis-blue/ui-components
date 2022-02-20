import {
  CALENDAR_VIEW,
  CCDatePickerCalendarProps,
  CCDateTimePickerWeekValue
} from "../../../../../../types";
import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { DateObject } from "../../../../../../../../Utils";
import { CCDatePickerCalendarDayItem } from "./components";

const LCalendarContents = styled("div", { label: "LWeekRow" })`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const CCDatePickerCalendarContents: React.FC<CCDatePickerCalendarProps> = (
  props: CCDatePickerCalendarProps
) => {
  const { value, onChange, component, view }: CCDatePickerCalendarProps = props;
  const range: Array<Date> = useMemo(() => {
    let res: Array<Date> = [];
    let _start: DateObject =
      view === CALENDAR_VIEW.DAY
        ? new DateObject(value as Date).startOf("month").startOf("week")
        : new DateObject((value as CCDateTimePickerWeekValue).begin as Date)
            .startOf("month")
            .startOf("week");
    let _end: DateObject =
      view === CALENDAR_VIEW.DAY
        ? new DateObject(value as Date).endOf("month").endOf("week")
        : new DateObject((value as CCDateTimePickerWeekValue).begin as Date)
            .endOf("month")
            .endOf("week");
    do {
      res.push(_start.toDate());
      _start = _start.add("day", 1);
    } while (_start.isSameOrBefore(_end));
    return res;
  }, [value, view]);

  return (
    <LCalendarContents>
      {range.map(date => {
        return (
          <CCDatePickerCalendarDayItem
            key={date.toLocaleString()}
            date={date}
            value={value}
            onChange={onChange}
            component={component}
            view={view}
          >
            {new DateObject(date).format("D")}
          </CCDatePickerCalendarDayItem>
        );
      })}
    </LCalendarContents>
  );
};

export default CCDatePickerCalendarContents;
