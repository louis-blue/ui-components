import React from "react";
import styled from "@emotion/styled";
import { CCAgendaSchedulerEvent } from "../../types";
import { DateObject } from "../../../../Utils";

const LMonthSchedulerRowHeader = styled("div", {
  label: "LMonthScheduler"
})<{ width?: number | string }>(({ theme, width }) => {
  return {
    display: "grid",
    placeItems: "center center",
    padding: 8
  };
});

const CCAgendaSchedulerRowHeader: React.FC<CCAgendaSchedulerEvent> = (
  props: CCAgendaSchedulerEvent
) => {
  const { date, event }: CCAgendaSchedulerEvent = props;

  return (
    <LMonthSchedulerRowHeader>
      {new DateObject(date).format("CALD")}
    </LMonthSchedulerRowHeader>
  );
};
export default CCAgendaSchedulerRowHeader;
