export enum SchedulerView {
  Week = "Week",
  Day = "Day",
  Agenda = "Agenda"
}

export type TimeStep = 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 55 | 60;

export interface CCSchedulerProps {
  date: Date;
  onChangeDate?: (e: Date) => void;
  view?: SchedulerView;
  onChangeView: (e: SchedulerView) => void;
  step?: TimeStep;
}

export interface CCSchedulerWeekViewProps {
  date: Date;
  step: TimeStep;
}

export interface CCSchedulerWeekGutterProps {
  step: TimeStep;
}

export interface CCSchedulerWeekColumnProps {
  step: TimeStep;
  date: Date;
}

export interface CCSchedulerHeaderProps {
  date: Date;
  onChangeDate: (e: Date) => void;
  onChangeView: (e: SchedulerView) => void;
  view: SchedulerView;
}
