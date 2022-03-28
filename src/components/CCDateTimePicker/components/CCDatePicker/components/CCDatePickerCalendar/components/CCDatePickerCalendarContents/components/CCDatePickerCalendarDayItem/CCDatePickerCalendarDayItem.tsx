import React, { useCallback, useMemo } from "react";
import {
  CALENDAR_VIEW,
  CCDatePickerCalendarSeriesProps,
  isDateTimePickerWeekValue
} from "../../../../../../../../types";
import { DateObject } from "../../../../../../../../../../Utils";
import styled from "@emotion/styled";

const LDayItem = styled("div", {
  label: "LDayItem",
  shouldForwardProp(propName: string): boolean {
    return propName !== "isCurrentMonth";
  }
})<{ isCurrentMonth?: boolean }>(({ isCurrentMonth }) => {
  return {
    width: 36,
    height: 36,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "#0277bd",
      color: "#fff"
    }
  };
});

const LDayItemContainer = styled("div", { label: "LDayItemContainer" })<{
  isSelected: boolean;
  isCurrentMonth?: boolean;
  isInside?: boolean;
  isLeftSide?: boolean;
  isRightSide?: boolean;
}>(({ isSelected, isCurrentMonth, isInside, isLeftSide, isRightSide }) => {
  let _backgroundColor = {
    backgroundColor: isSelected ? "#00897b" : "transparent"
  };
  let _color = {
    color: isSelected ? "#fff" : isCurrentMonth ? "#000" : "#e3e3e3"
  };
  let _borderRadius = (() => {
    if (isInside) {
      return { borderRadius: "0%" };
    }
    if (isLeftSide) {
      return { borderRadius: "50% 0% 0% 50%" };
    }
    if (isRightSide) {
      return { borderRadius: "0% 50% 50% 0%" };
    }
    return { borderRadius: "50%" };
  })();
  return {
    width: 36,
    height: 36,
    ..._backgroundColor,
    ..._color,
    ..._borderRadius
  };
});

const _isBetween = (
  target: Date,
  start: Date,
  end: Date,
  inclusivity: "()" | "[)" | "(]" | "[]"
): boolean => {
  return new DateObject(target).isBetween(
    new DateObject(start),
    new DateObject(end),
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
    if (!(date instanceof Date)) {
      return false;
    }
    if (view === CALENDAR_VIEW.WEEK) {
      if (!isDateTimePickerWeekValue(value)) {
        return false;
      }
      return new DateObject(value.begin).isSame(new DateObject(date), [
        "month"
      ]);
    } else {
      if (!(value instanceof Date)) {
        return false;
      }
      return new DateObject(value).isSame(new DateObject(date), ["month"]);
    }
  }, [date, value, view]);
  const isCurrent: boolean = useMemo(() => {
    if (!(date instanceof Date)) {
      return false;
    }
    if (view === CALENDAR_VIEW.WEEK) {
      if (!isDateTimePickerWeekValue(value)) {
        return false;
      }
      return new DateObject(value.begin).isSame(new DateObject(date), [
        "month",
        "year",
        "week"
      ]);
    } else {
      if (!(value instanceof Date)) {
        return false;
      }
      return new DateObject(value).isSame(new DateObject(date), [
        "month",
        "year",
        "day"
      ]);
    }
  }, [date, value, view]);
  const isIn = useCallback(
    (
      inclusivity: "()" | "[)" | "(]" | "[]",
      fallback: boolean = false
    ): boolean => {
      if (!(date instanceof Date)) {
        return false;
      }
      if (view === CALENDAR_VIEW.WEEK) {
        if (!isDateTimePickerWeekValue(value)) {
          return false;
        }
        if (value.begin === null || value.end == null) {
          return false;
        }
        return _isBetween(date, value.begin, value.end, inclusivity);
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

  if (!(date instanceof Date)) {
    return <></>;
  }

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
              if (!(value instanceof Date)) {
                return false;
              }
              onChange &&
                onChange(
                  new DateObject(value)
                    .setYear(new DateObject(date).year)
                    .setMonth(new DateObject(date).month)
                    .setDate(new DateObject(date).date)
                    .toDate()
                );
              break;
            case CALENDAR_VIEW.WEEK:
              if (!isDateTimePickerWeekValue(value)) {
                return false;
              }
              let _day = new DateObject(value.begin)
                .setYear(new DateObject(date).year)
                .setMonth(new DateObject(date).month)
                .setDate(new DateObject(date).date);
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
        {new DateObject(date).format("D")}
      </LDayItem>
    </LDayItemContainer>
  );
};

export default CCDatePickerCalendarDayItem;
