import DateScheduler from "../../Utils/DateScheduler";
import { MutableRefObject } from "react";

export enum SchedulerView {
  Week = "Week",
  Day = "Day",
  Agenda = "Agenda"
}

export enum DropTarget {
  Week = "WeekDrop",
  Day = "DayDrop",
  DragHandle = "DragHandle"
}

export const Step = [5, 10, 15, 20, 30, 60] as const;

export type TimeStep = typeof Step[number];
export type SchedulerEvent = {
  id: string;
  dateBegin: Date;
  dateEnd: Date;
};
export type SchedulerCellEvent = Pick<SchedulerEvent, "dateBegin" | "dateEnd">;

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

export type CCSchedulerHeaderProps = Pick<CCSchedulerProps, "date"> & {
  onChangeView: (e: SchedulerView) => void;
  onChangeDate: (e: Date) => void;
  view: SchedulerView;
};
export type CCSchedulerViewProps = Pick<CCSchedulerProps,
  "date" | "onChange" | "onClickCell" | "onClickEvent"> & {
  step: TimeStep;
  contents: DateScheduler;
};

export type CCSchedulerWeekViewProps = CCSchedulerViewProps;
export type CCSchedulerDayViewProps = CCSchedulerViewProps;

export type CCSchedulerWeekGutterProps = Pick<CCSchedulerWeekViewProps, "step">;
export type CCSchedulerDayGutterProps = Pick<CCSchedulerDayViewProps, "step">;

export interface CCSchedulerWeekColumnProps extends CCSchedulerWeekViewProps {}

export interface CCSchedulerDayColumnProps extends CCSchedulerDayViewProps {}

export interface CCSchedulerViewEventProps {
  dateBegin: Date;
  dateEnd: Date;
  maxFriendsCount: number;
  step: TimeStep;
  id: string;
  event: SchedulerEvent;
  onClickEvent: (e: SchedulerEvent) => void;
}

export interface CCSchedulerWeekViewEventProps
  extends CCSchedulerViewEventProps {}

export interface CCSchedulerDayViewEventProps
  extends CCSchedulerViewEventProps {}

export interface CCSchedulerColumnItemProps {
  borderBottom: boolean;
  index: number;
  step: TimeStep;
}

export interface CCSchedulerWeekColumnItemProps
  extends CCSchedulerColumnItemProps {}

export interface CCSchedulerDayColumnItemProps
  extends CCSchedulerColumnItemProps {}

export interface DragObject {
  event: SchedulerEvent;
  ref: MutableRefObject<HTMLDivElement | null>;
}

export interface CCSchedulerDropLayerProps {
  date: Date;
  step: TimeStep;
  onChange: (e: SchedulerEvent) => void;
  onClickCell: (e: SchedulerCellEvent) => void;
}

export interface CCSchedulerWeekDropLayerProps
  extends CCSchedulerDropLayerProps {}

export interface CCSchedulerDayDropLayerProps
  extends CCSchedulerDropLayerProps {}

export interface CCSchedulerDropZoneProps {
  date: Date;
  index: number;
  step: TimeStep;
  onChange: (e: SchedulerEvent) => void;
  onClickCell: (e: SchedulerCellEvent) => void;
}

export interface CCSchedulerWeekDropZoneProps
  extends CCSchedulerDropZoneProps {}

export interface CCSchedulerDayDropZoneProps extends CCSchedulerDropZoneProps {}
