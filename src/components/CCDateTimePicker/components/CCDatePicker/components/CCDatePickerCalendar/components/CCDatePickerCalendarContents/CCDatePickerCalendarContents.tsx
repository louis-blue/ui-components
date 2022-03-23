import {
  CALENDAR_VIEW,
  CCDatePickerCalendarProps,
  isDateTimePickerWeekValue
} from "../../../../../../types";
import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { DateObject } from "../../../../../../../../Utils";
import { CCDatePickerCalendarDayItem } from "./components";

const LCalendarContents = styled("div", { label: "LWeekRow" })(() => {
  return {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)"
  };
});

const CCDatePickerCalendarContents: React.FC<CCDatePickerCalendarProps> = (
  props: CCDatePickerCalendarProps
) => {
  const { value, onChange, component, view }: CCDatePickerCalendarProps = props;
  const range: Array<Date> = useMemo(() => {
    let res: Array<Date> = [];
    if (view === CALENDAR_VIEW.DAY) {
      if (!(value instanceof Date)) {
        return res;
      }
      let _start = new DateObject(value).startOf("month").startOf("week");
      let _end = new DateObject(value).endOf("month").endOf("week");
      do {
        res.push(_start.toDate());
        _start = _start.add("day", 1);
      } while (_start.isSameOrBefore(_end));
    } else {
      if (!isDateTimePickerWeekValue(value)) {
        return res;
      }
      let _start = new DateObject(value.begin).startOf("month").startOf("week");
      let _end = new DateObject(value.begin).endOf("month").endOf("week");
      do {
        res.push(_start.toDate());
        _start = _start.add("day", 1);
      } while (_start.isSameOrBefore(_end));
    }

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
