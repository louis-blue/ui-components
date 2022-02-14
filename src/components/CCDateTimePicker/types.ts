import React from "react";

export enum PICKER_FEATURES {
  DATE = "PICKER_FEATURES_DATE",
  TIME = "PICKER_FEATURES_TIME"
}

export enum CALENDAR_VIEW {
  DAY = "CALENDAR_VIEW_DAY",
  WEEK = "CALENDAR_VIEW_WEEK"
}

export type CCDateTimePickerWeekValue = {
  begin: Date;
  end: Date;
};

export interface CCDateTimePickerRawProps {
  features: Array<PICKER_FEATURES>;
  view: CALENDAR_VIEW;
}

export interface CCDateTimePickerProps extends CCDateTimePickerRawProps {
  open: boolean;
  onClose?: () => void;
  onChange?: (date: Date | CCDateTimePickerWeekValue) => void;
  value: Date | CCDateTimePickerWeekValue;
  disabledMeridiem?: boolean;
  step?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30;
}

export interface CCDatePickerProps {
  onChange?: (date: Date | CCDateTimePickerWeekValue) => void;
  value: Date | CCDateTimePickerWeekValue;
  view: CALENDAR_VIEW;
}

export interface CCDateTimePickerHeaderProps extends CCDateTimePickerRawProps {
  value: Date | CCDateTimePickerWeekValue;
}

export interface CCDatePickerHeaderProps {
  onChange?: (date: Date | CCDateTimePickerWeekValue) => void;
  onClickYear?: () => void;
  onClickMonth?: () => void;
  value: Date | CCDateTimePickerWeekValue;
  view: CALENDAR_VIEW;
}

export interface CCDatePickerCalendarProps {
  onChange?: (date: Date | CCDateTimePickerWeekValue) => void;
  value: Date | CCDateTimePickerWeekValue;
  component?: React.ReactElement;
  view: CALENDAR_VIEW;
}

export interface CCDatePickerCalendarSeriesProps {
  onChange?: (date: Date | CCDateTimePickerWeekValue) => void;
  date: Date | CCDateTimePickerWeekValue;
  value: Date | CCDateTimePickerWeekValue;
  component?: React.ReactElement;
  view: CALENDAR_VIEW;
}

export interface CCCCDatePickerYearPickerProps extends CCDatePickerHeaderProps {
  open: boolean;
  view: CALENDAR_VIEW;
}

export interface CCCCDatePickerMonthPickerProps
  extends CCDatePickerHeaderProps {
  open: boolean;
  view: CALENDAR_VIEW;
}

export interface CCTimePickerProps {
  onChange?: (date: Date) => void;
  value: Date;
  disabledMeridiem: boolean;
  step?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30;
}

export interface CCTMeridiemPickerProps {
  onChange?: (date: Date) => void;
  value: Date;
  disabledMeridiem: boolean;
}
