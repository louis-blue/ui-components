import React, { useCallback, useMemo } from "react";
import styled from "@emotion/styled";
import { CCMonthSchedulerCalendarProps } from "../../types";
import { DateObject } from "../../../../Utils";
import { CCMonthSchedulerCalendarItem } from "./components";

const LMonthSchedulerCalendar = styled("div", {
  label: "LMonthScheduler"
})<{ width?: number | string }>(({ theme, width }) => {
  return {
    display: "grid",
    gridTemplateColumns: "repeat(7,minmax(100px,auto))",
    gridTemplateRows: "30px",
    gridAutoRows: "minmax(100px,auto)",
    borderLeft: "1px solid #000",
    borderTop: "1px solid #000"
  };
});

const LMonthSchedulerCalendarHeader = styled("div", {
  label: "LMonthSchedulerCalendarHeader"
})<{ width?: number | string }>(({ theme, width }) => {
  return {
    display: "grid",
    placeItems: "center center",
    borderRight: "1px solid #000",
    borderBottom: "1px solid #000"
  };
});

const CCMonthSchedulerCalendar: React.FC<CCMonthSchedulerCalendarProps> = (
  props: CCMonthSchedulerCalendarProps
) => {
  const {
    date,
    contents,
    onClick,
    onClickCell,
    component
  }: CCMonthSchedulerCalendarProps = props;
  const startOfWeek = new DateObject(null).startOf("week");
  const weekArray = Array(7).fill(1);
  const range: Array<Date> = useMemo(() => {
    let res: Array<Date> = [];
    let _start: DateObject = new DateObject(date as Date)
      .startOf("month")
      .startOf("week");
    let _end: DateObject = new DateObject(date as Date)
      .endOf("month")
      .endOf("week");
    do {
      res.push(_start.toDate());
      _start = _start.add("day", 1);
    } while (_start.isSameOrBefore(_end));
    return res;
  }, [date]);
  const isCurrentMonth = useCallback(
    (currentDate: Date): boolean => {
      return new DateObject(currentDate).isSame(new DateObject(date), [
        "year",
        "month"
      ]);
    },
    [date]
  );
  return (
    <LMonthSchedulerCalendar>
      {weekArray.map((item, index) => {
        return (
          <LMonthSchedulerCalendarHeader
            key={"CCMonthSchedulerCalendarHeader" + index}
          >
            {startOfWeek.add("day", index).format("dddd").toUpperCase()}
          </LMonthSchedulerCalendarHeader>
        );
      })}
      {range.map(item => {
        return (
          <CCMonthSchedulerCalendarItem
            key={item.toString()}
            date={item}
            contents={contents}
            onClick={onClick}
            onClickCell={onClickCell}
            component={Boolean(component) ? component : undefined}
            isCurrentMonth={isCurrentMonth(item)}
          />
        );
      })}
    </LMonthSchedulerCalendar>
  );
};
export default CCMonthSchedulerCalendar;
