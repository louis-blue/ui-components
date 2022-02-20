import React, { useState } from "react";
import { CCMonthSchedulerProps, SchedulerView } from "./types";
import styled from "@emotion/styled";
import { CCMonthSchedulerCalendar, CCMonthSchedulerHeader } from "./components";
import { CCAgendaScheduler } from "../index";
import { DateObject } from "../../Utils";

const LMonthScheduler = styled("div", {
  label: "LMonthScheduler"
})<{ width?: number | string }>(({ theme, width }) => {
  return {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridRowGap: 16
  };
});

const CCMonthScheduler: React.FC<CCMonthSchedulerProps> = (
  props: CCMonthSchedulerProps
) => {
  const {
    contents,
    onClick,
    onClickCell,
    component,
    onChangeDate,
    date = new Date(),
    view = SchedulerView.Month
  }: CCMonthSchedulerProps = props;
  const [_view, _setView] = useState(view);
  console.log();

  return (
    <LMonthScheduler>
      <CCMonthSchedulerHeader
        view={_view}
        onChangeView={e => {
          _setView(e);
        }}
        date={date}
        onChange={e => {
          onChangeDate?.(e);
        }}
      />
      {_view === SchedulerView.Month && (
        <CCMonthSchedulerCalendar
          date={date}
          contents={contents}
          onClick={onClick}
          onClickCell={onClickCell}
          component={component}
        />
      )}
      {_view === SchedulerView.Agenda && (
        <CCAgendaScheduler
          date={{
            begin: new DateObject(date).startOf("month").toDate(),
            end: new DateObject(date).endOf("month").toDate()
          }}
          contents={contents}
          onClick={onClickCell}
          component={
            Boolean(component?.agenda)
              ? {
                  agenda: component?.agenda
                }
              : undefined
          }
        />
      )}
    </LMonthScheduler>
  );
};
export default CCMonthScheduler;
