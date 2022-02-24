import DateScheduler from "../../Utils/DateScheduler";

export enum SchedulerView {
  Week = "Week",
  Day = "Day",
  Agenda = "Agenda"
}

export type TimeStep = 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 55 | 60;
export type SchedulerEvent = {
  id: string;
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
}

export interface CCSchedulerWeekViewProps {
  date: Date;
  step: TimeStep;
  contents: DateScheduler;
}

export interface CCSchedulerWeekGutterProps {
  step: TimeStep;
}

export interface CCSchedulerWeekColumnProps {
  step: TimeStep;
  date: Date;
  contents: DateScheduler;
}

export interface CCSchedulerHeaderProps {
  date: Date;
  onChangeDate: (e: Date) => void;
  onChangeView: (e: SchedulerView) => void;
  view: SchedulerView;
}
