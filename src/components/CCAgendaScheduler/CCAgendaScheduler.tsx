import styled from "@emotion/styled";
import React from "react";
import { CCAgendaSchedulerProps } from "./types";

const LAgendaScheduler = styled("div", {
  label: "LMonthSchedulerCalendarComponent"
})<{ width?: number | string }>(({ theme, width }) => {
  return {
    display: "grid",
    gridTemplateColumns: "minmax(50px,auto) 1fr",
    borderTop: "1px solid #000",
    borderLeft: "1px solid #000"
  };
});
const LMonthSchedulerRowHeaderContainer = styled("div", {
  label: "LMonthScheduler"
})<{ width?: number | string }>(({ theme, width }) => {
  return {
    display: "grid",
    placeItem: "center center",
    borderRight: "1px solid #000",
    borderBottom: "1px solid #000"
  };
});
const LMonthSchedulerRowEventContainer = styled("div", {
  label: "LMonthScheduler"
})<{ width?: number | string }>(({ theme, width }) => {
  return {
    display: "grid",
    placeItem: "center center",
    borderRight: "1px solid #000",
    borderBottom: "1px solid #000"
  };
});

const CCAgendaScheduler: React.FC<CCAgendaSchedulerProps> = (
  props: CCAgendaSchedulerProps
) => {
  const { date, contents, onClick, component }: CCAgendaSchedulerProps = props;

  return (
    <LAgendaScheduler>
      {contents.map((item, index) => {
        return (
          <>
            {
              <LMonthSchedulerRowHeaderContainer
                key={
                  "LMonthSchedulerRowHeaderContainer" + date.toString() + index
                }
                onClick={e => {
                  onClick?.(item);
                }}
              >
                {component?.agenda?.header?.(item)}
              </LMonthSchedulerRowHeaderContainer>
            }
            {
              <LMonthSchedulerRowEventContainer
                key={
                  "LMonthSchedulerRowEventContainer" + date.toString() + index
                }
                onClick={e => {
                  onClick?.(item);
                }}
              >
                {component?.agenda?.event?.(item)}
              </LMonthSchedulerRowEventContainer>
            }
          </>
        );
      })}
    </LAgendaScheduler>
  );
};
export default CCAgendaScheduler;
