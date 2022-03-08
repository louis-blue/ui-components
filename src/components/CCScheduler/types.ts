import DateScheduler from "../../Utils/DateScheduler";
import { MutableRefObject } from "react";

export enum SchedulerView {
  Week = "Week",
  Day = "Day",
  Agenda = "Agenda"
}

export enum DropTarget {
  Week = "WeekDrop",
  Day = "DayDrop"
}

export type TimeStep = 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 55 | 60;
export type SchedulerEvent = {
  id: string;
  dateBegin: Date;
  dateEnd: Date;
};
export type SchedulerCellEvent = {
  dateBegin: Date;
  dateEnd: Date;
};

export interface CCSchedulerProps {
  date: Date;
  onChangeDate?: (e: Date) => void;
  view?: SchedulerView;
  onChangeView: (e: SchedulerView) => void;
  step?: TimeStep;
  contents: Array<SchedulerEvent>;
  onChange: (e: SchedulerEvent) => void;
  onClickCell: (e: SchedulerCellEvent) => void;
  onClickEvent: (e: SchedulerEvent) => void;
}

export interface CCSchedulerWeekViewProps {
  date: Date;
  step: TimeStep;
  contents: DateScheduler;
  onChange: (e: SchedulerEvent) => void;
  onClickCell: (e: SchedulerCellEvent) => void;
  onClickEvent: (e: SchedulerEvent) => void;
}

export interface CCSchedulerWeekGutterProps {
  step: TimeStep;
}

export interface CCSchedulerWeekColumnProps {
  step: TimeStep;
  date: Date;
  contents: DateScheduler;
  onChange: (e: SchedulerEvent) => void;
  onClickCell: (e: SchedulerCellEvent) => void;
  onClickEvent: (e: SchedulerEvent) => void;
}

export interface CCSchedulerHeaderProps {
  date: Date;
  onChangeDate: (e: Date) => void;
  onChangeView: (e: SchedulerView) => void;
  view: SchedulerView;
}

export interface CCSchedulerWeekViewEventProps {
  dateBegin: Date;
  dateEnd: Date;
  maxFriendsCount: number;
  step: TimeStep;
  id: string;
  event: SchedulerEvent;
  onClickEvent: (e: SchedulerEvent) => void;
}

export interface CCSchedulerWeekColumnItemProps {
  borderBottom: boolean;
  index: number;
  step: TimeStep;
}

export interface DragObject {
  event: SchedulerEvent;
  ref: MutableRefObject<HTMLDivElement | null>;
}

export interface CCSchedulerWeekDropLayerProps {
  date: Date;
  step: TimeStep;
  onChange: (e: SchedulerEvent) => void;
  onClickCell: (e: SchedulerCellEvent) => void;
}

export interface CCSchedulerWeekDropZoneProps {
  date: Date;
  index: number;
  step: TimeStep;
  onChange: (e: SchedulerEvent) => void;
  onClickCell: (e: SchedulerCellEvent) => void;
}
