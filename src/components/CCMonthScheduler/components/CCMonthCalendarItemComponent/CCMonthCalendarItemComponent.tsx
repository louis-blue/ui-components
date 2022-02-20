import React from "react";
import { CCMontSchedulerEvent } from "../../types";
import styled from "@emotion/styled";

const LMonthSchedulerCalendarItem = styled("div", {
  label: "LMonthSchedulerCalendarItem"
})<{ width?: number | string }>(({ theme, width }) => {
  return {
    display: "grid",
    background: "blue"
  };
});

const CCMonthSchedulerCalendarItem: React.FC<CCMontSchedulerEvent> = (
  props: CCMontSchedulerEvent
) => {
  const { date, event }: CCMontSchedulerEvent = props;

  console.log("event", event);

  return (
    <LMonthSchedulerCalendarItem>
      <div>{event?.title}</div>
      <div>{event?.staff}</div>
      <div>{event?.content}</div>
    </LMonthSchedulerCalendarItem>
  );
};
export default CCMonthSchedulerCalendarItem;
