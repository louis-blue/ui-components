import {
  CALENDAR_VIEW,
  CCDatePickerHeaderProps,
  CCDateTimePickerWeekValue
} from "../../../../types";
import React from "react";
import DateObject from "../../../../Utils";

function yearSelectItem() {
  const start = 1902;
  const end = 2031;
  const loop = Array(end - start).fill(1);
  return loop.map((item, index) => {
    return (
      <option key={index + start} value={String(index + start)}>
        {new DateObject(null).setYear(index + start).format("YYYY")}
      </option>
    );
  });
}

const CCDatePickerHeader: React.FC<CCDatePickerHeaderProps> = (
  props: CCDatePickerHeaderProps
) => {
  const { value, view, onChange = () => {} }: CCDatePickerHeaderProps = props;
  return (
    <>
      <select
        value={String(
          view === CALENDAR_VIEW.DAY
            ? new DateObject(value as Date).year
            : (new DateObject(
                (value as CCDateTimePickerWeekValue).begin as Date
              ).year as number)
        )}
        onChange={e => {
          if (view === CALENDAR_VIEW.DAY) {
            onChange(
              new DateObject(value as Date)
                .setYear(Number(e.target.value))
                .toDate() as Date
            );
          }
          if (view === CALENDAR_VIEW.WEEK) {
            onChange(
              new DateObject((value as CCDateTimePickerWeekValue).begin as Date)
                .setYear(Number(e.target.value))
                .toDate() as Date
            );
          }
        }}
      >
        {yearSelectItem()}
      </select>
      <select
        value={String(
          (view === CALENDAR_VIEW.DAY
            ? new DateObject(value as Date).month
            : new DateObject((value as CCDateTimePickerWeekValue).begin as Date)
                .month) as number
        )}
        onChange={e => {
          if (view === CALENDAR_VIEW.DAY) {
            onChange(
              new DateObject(value as Date)
                .setMonth(Number(e.target.value))
                .toDate() as Date
            );
          }
          if (view === CALENDAR_VIEW.WEEK) {
            onChange(
              new DateObject((value as CCDateTimePickerWeekValue).begin as Date)
                .setMonth(Number(e.target.value))
                .toDate() as Date
            );
          }
        }}
      >
        {DateObject.monthFormat.map((item: string, index: number) => {
          return (
            <option key={item} value={index}>
              {item}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default CCDatePickerHeader;
