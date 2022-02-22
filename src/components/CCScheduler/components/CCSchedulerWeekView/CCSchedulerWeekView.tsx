import React, { useMemo } from "react";
import { CCSchedulerWeekViewProps } from "../../types";
import styled from "@emotion/styled";
import { CCSchedulerWeekColumn, CCSchedulerWeekGutter } from "./components";
import { DateObject } from "../../../../Utils";

const LSchedulerWeekView = styled(`div`, { label: "LSchedulerWeekView" })(
  () => {
    return {
      display: "grid",
      gridTemplateColumns: "minmax(100px,auto) repeat(7, 1fr)",
      width: "100%",
      borderTop: "1px solid #000",
      borderLeft: "1px solid #000",
      borderBottom: "1px solid #000",
      position: "relative",
      overflow: "auto"
    };
  }
);
const range: Array<number> = new Array(7).fill(0);
const CCSchedulerWeekView: React.FC<CCSchedulerWeekViewProps> = (
  props: CCSchedulerWeekViewProps
) => {
  const { date, step }: CCSchedulerWeekViewProps = props;
  const weeks: Array<Date> = useMemo(() => {
    let _weeks: Array<Date> = [];
    range.forEach((item, index) => {
      _weeks.push(
        new DateObject(date).startOf("week").add("day", index).toDate()
      );
    });
    return _weeks;
  }, [date]);
  console.log(weeks);

  return (
    <LSchedulerWeekView>
      <CCSchedulerWeekGutter step={step} />
      {weeks.map(date => {
        return (
          <CCSchedulerWeekColumn
            key={date.toString()}
            step={step}
            date={date}
          />
        );
      })}
    </LSchedulerWeekView>
  );
};

export default CCSchedulerWeekView;
