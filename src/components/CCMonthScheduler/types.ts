import React from "react";
import {
  CCAgendaSchedulerComponent,
  CCAgendaSchedulerEvent
} from "../CCAgendaScheduler/types";

export enum SchedulerView {
  Month = "Month",
  Agenda = "Agenda"
}

export interface CCMontSchedulerEvent {
  date: Date;
  event: { [key: string]: any };
}

export interface CCMonthSchedulerComponentRaw {
  month: { event?: React.FC<React.PropsWithChildren<CCMontSchedulerEvent>> };
}

export interface CCMonthSchedulerComponent
  extends CCMonthSchedulerComponentRaw,
    CCAgendaSchedulerComponent {}

export interface CCMonthSchedulerProps {
  contents: Array<CCMontSchedulerEvent>;
  onClick: (e: CCMontSchedulerEvent | CCAgendaSchedulerEvent) => void;
  date?: Date;
  onClickCell: (e: { date: Date }) => void;
  component?: CCMonthSchedulerComponent;
  onChangeDate: (e: Date) => void;
  view?: SchedulerView;
}

export interface CCMonthSchedulerHeaderProps {
  date: Date;
  onChange: (e: Date) => void;
  view: SchedulerView;
  onChangeView: (e: SchedulerView) => void;
}

export interface CCMonthSchedulerCalendarProps {
  contents: Array<CCMontSchedulerEvent>;
  onClick: (e: CCMontSchedulerEvent | CCAgendaSchedulerEvent) => void;
  date?: Date;
  onClickCell: (e: { date: Date }) => void;
  component?: CCMonthSchedulerComponent;
}

export interface CCMonthSchedulerCalendarItemProps {
  contents: Array<CCMontSchedulerEvent>;
  onClick: (e: CCMontSchedulerEvent | CCAgendaSchedulerEvent) => void;
  date?: Date;
  onClickCell: (e: { date: Date }) => void;
  component?: CCMonthSchedulerComponent;
  isCurrentMonth: boolean;
}
