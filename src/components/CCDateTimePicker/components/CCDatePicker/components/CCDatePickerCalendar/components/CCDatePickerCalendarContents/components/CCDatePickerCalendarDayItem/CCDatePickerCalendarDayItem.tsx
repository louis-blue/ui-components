import React, { useCallback, useMemo } from "react";
import {
  CALENDAR_VIEW,
  CCDatePickerCalendarSeriesProps,
  CCDateTimePickerWeekValue
} from "../../../../../../../../types";
import { DateObject } from "../../../../../../../../../../Utils";
import styled from "@emotion/styled";

const LDayItem = styled("div", {
  label: "LDayItem",
  shouldForwardProp(propName: string): boolean {
    return propName !== "isCurrentMonth";
  }
})<{ isCurrentMonth?: boolean }>`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    background-color: #0277bd;
    color: #fff;
  }
`;
const LDayItemContainer = styled("div", { label: "LDayItemContainer" })<{
  isSelected: boolean;
  isCurrentMonth?: boolean;
  isInside?: boolean;
  isLeftSide?: boolean;
  isRightSide?: boolean;
}>`
  width: 36px;
  height: 36px;
  background-color: ${props => (props?.isSelected ? "#00897b" : "transparent")};
  color: ${props =>
    props?.isSelected ? "#fff" : props?.isCurrentMonth ? "#000" : "#e3e3e3"};
  border-radius: ${props => {
    if (props?.isInside) {
      return "0%";
    }
    if (props?.isLeftSide) {
      return "50% 0% 0% 50%";
    }
    if (props?.isRightSide) {
      return "0% 50% 50% 0%";
    }
    return "50%";
  }};
`;
const _isBetween = (
  target: Date,
  start: Date,
  end: Date,
  inclusivity: "()" | "[)" | "(]" | "[]"
): boolean => {
  return new DateObject(target as Date).isBetween(
    new DateObject(start as Date),
    new DateObject(end as Date),
    "day",
    inclusivity
  );
};

const CCDatePickerCalendarDayItem: React.FC<CCDatePickerCalendarSeriesProps> = (
  props: CCDatePickerCalendarSeriesProps
) => {
  const {
    date,
    value,
    onChange,
    component,
    view
  }: CCDatePickerCalendarSeriesProps = props;
  const isCurrentMonth: boolean = useMemo(() => {
    if (view === CALENDAR_VIEW.WEEK) {
      return new DateObject(
        (value as CCDateTimePickerWeekValue).begin as Date
      ).isSame(new DateObject(date as Date), ["month"]);
    } else {
      return new DateObject(value as Date).isSame(
        new DateObject(date as Date),
        ["month"]
      );
    }
  }, [date, value, view]);
  const isCurrent: boolean = useMemo(() => {
    if (view === CALENDAR_VIEW.WEEK) {
      return new DateObject(value as Date).isSame(
        new DateObject(date as Date),
        ["month", "year", "week"]
      );
    } else {
      return new DateObject(value as Date).isSame(
        new DateObject(date as Date),
        ["month", "year", "day"]
      );
    }
  }, [date, value, view]);
  const isIn = useCallback(
    (
      inclusivity: "()" | "[)" | "(]" | "[]",
      fallback: boolean = false
    ): boolean => {
      if (view === CALENDAR_VIEW.WEEK) {
        if (
          (value as CCDateTimePickerWeekValue)?.begin === null ||
          (value as CCDateTimePickerWeekValue)?.end == null
        ) {
          return false;
        }
        return _isBetween(
          date as Date,
          (value as CCDateTimePickerWeekValue).begin as Date,
          (value as CCDateTimePickerWeekValue).end as Date,
          inclusivity
        );
      } else {
        return fallback;
      }
    },
    [date, view, value]
  );
  const isSelected: boolean = useMemo(() => {
    return isIn("[]", isCurrent);
  }, [isCurrent, isIn]);
  const isInside: boolean = useMemo(() => {
    return isIn("()");
  }, [isIn]);
  const isLeftSide: boolean = useMemo(() => {
    return isIn("[)");
  }, [isIn]);
  const isRightSide: boolean = useMemo(() => {
    return isIn("(]");
  }, [isIn]);

  return (
    <LDayItemContainer
      isSelected={isSelected}
      isInside={isInside}
      isCurrentMonth={isCurrentMonth}
      isLeftSide={isLeftSide}
      isRightSide={isRightSide}
      onClick={() => {
        try {
          switch (view) {
            case CALENDAR_VIEW.DAY:
              onChange &&
                onChange(
                  new DateObject(value as Date)
                    .setYear(new DateObject(date as Date).year)
                    .setMonth(new DateObject(date as Date).month)
                    .setDate(new DateObject(date as Date).date)
                    .toDate()
                );
              break;
            case CALENDAR_VIEW.WEEK:
              let _day = new DateObject(
                (value as CCDateTimePickerWeekValue).begin
              )
                .setYear(new DateObject(date as Date).year)
                .setMonth(new DateObject(date as Date).month)
                .setDate(new DateObject(date as Date).date);
              onChange &&
                onChange({
                  begin: _day.startOf("week").toDate(),
                  end: _day.endOf("week").toDate()
                });
              break;
            default:
              break;
          }
        } catch (err) {
          console.error(err);
        }
      }}
    >
      <LDayItem
        data-date={date.toLocaleString()}
        key={date.toLocaleString()}
        isCurrentMonth={isCurrentMonth}
      >
        {new DateObject(date as Date).format("D")}
      </LDayItem>
    </LDayItemContainer>
  );
};

export default CCDatePickerCalendarDayItem;
