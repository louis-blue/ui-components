import styled from "@emotion/styled";
import React from "react";
import { CCAgendaSchedulerEvent } from "../../types";

const LAgendaSchedulerRowItem = styled("div", {
  label: "LAgendaSchedulerRowItem"
})<{ width?: number | string }>(({ theme, width }) => {
  return {
    display: "grid",
    placeItems: "center start",
    gridTemplateColumns: "1fr",
    gridRowGap: 8,
    padding: 8
  };
});

const CCAgendaSchedulerRowItem: React.FC<CCAgendaSchedulerEvent> = (
  props: CCAgendaSchedulerEvent
) => {
  const { date, event }: CCAgendaSchedulerEvent = props;

  return (
    <LAgendaSchedulerRowItem>
      <div>{event.title}</div>
      <div>{event.staff}</div>
      <div>{event.content}</div>
    </LAgendaSchedulerRowItem>
  );
};
export default CCAgendaSchedulerRowItem;
