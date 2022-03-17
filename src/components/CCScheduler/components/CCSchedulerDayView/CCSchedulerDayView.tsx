import React from "react";
import { CCSchedulerDayViewProps } from "../../types";
import styled from "@emotion/styled";
import { CCSchedulerDayColumn, CCSchedulerDayGutter } from "./components";

const LSchedulerDayView = styled(`div`, { label: "LSchedulerWeekView" })(() => {
  return {
    display: "grid",
    gridTemplateColumns: "minmax(100px,auto) 1fr",
    width: "100%",
    borderTop: "1px solid #000",
    borderLeft: "1px solid #000",
    borderBottom: "1px solid #000",
    position: "relative",
    overflow: "auto"
  };
});
const CCSchedulerDayView: React.FC<CCSchedulerDayViewProps> = (
  props: CCSchedulerDayViewProps
) => {
  const {
    date,
    step,
    contents,
    onChange,
    onClickCell,
    onClickEvent
  }: CCSchedulerDayViewProps = props;

  return (
    <LSchedulerDayView>
      <CCSchedulerDayGutter step={step} />
      <CCSchedulerDayColumn
        key={date.toString()}
        step={step}
        date={date}
        contents={contents}
        onChange={onChange}
        onClickCell={onClickCell}
        onClickEvent={onClickEvent}
      />
    </LSchedulerDayView>
  );
};

export default CCSchedulerDayView;
