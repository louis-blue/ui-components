import React, { useMemo } from "react";
import {
  CCMonthSchedulerCalendarItemProps,
  CCMontSchedulerEvent
} from "../../../../types";
import styled from "@emotion/styled";
import { DateObject } from "../../../../../../Utils";

const LMonthSchedulerCalendarDate = styled("div", {
  label: "LMonthSchedulerCalendarItem"
})(({ theme }) => {
  return {
    borderRight: "1px solid #000",
    borderBottom: "1px solid #000"
  };
});
const LMonthSchedulerCalendarDateLabel = styled("div", {
  label: "LMonthSchedulerCalendarDateLabel"
})<{ isCurrentMonth: boolean }>(({ theme, isCurrentMonth }) => {
  return {
    color: isCurrentMonth ? "#000" : "#e9e9e9"
  };
});

const CCMonthSchedulerCalendarItem: React.FC<
  CCMonthSchedulerCalendarItemProps
> = (props: CCMonthSchedulerCalendarItemProps) => {
  const {
    date,
    contents,
    onClick,
    onClickCell,
    component,
    isCurrentMonth
  }: CCMonthSchedulerCalendarItemProps = props;
  const event = useMemo(() => {
    return contents.filter(item => {
      return new DateObject((item as CCMontSchedulerEvent).date).isBetween(
        new DateObject(date).startOf("day"),
        new DateObject(date).endOf("day"),
        "day",
        "[]"
      );
    });
  }, [date, contents]);

  return (
    <LMonthSchedulerCalendarDate
      onClick={e => {
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
        onClickCell?.({ date: date as Date });
      }}
    >
      <LMonthSchedulerCalendarDateLabel isCurrentMonth={isCurrentMonth}>
        {new DateObject(date).format("DD")}
      </LMonthSchedulerCalendarDateLabel>
      {event.map((item, index) => {
        return (
          <div
            onClick={e => {
              e.nativeEvent.stopImmediatePropagation();
              e.stopPropagation();
              onClick?.(item);
            }}
            key={"LMonthSchedulerCalendarDate" + index}
          >
            {component?.month?.event?.(item)}
          </div>
        );
      })}
    </LMonthSchedulerCalendarDate>
  );
};
export default CCMonthSchedulerCalendarItem;
