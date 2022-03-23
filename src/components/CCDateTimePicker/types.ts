import React from "react";

export enum PICKER_FEATURES {
  DATE = "PICKER_FEATURES_DATE",
  TIME = "PICKER_FEATURES_TIME"
}

export enum CALENDAR_VIEW {
  DAY = "CALENDAR_VIEW_DAY",
  WEEK = "CALENDAR_VIEW_WEEK"
}

export interface CCDateTimePickerWeekValue {
  begin: Date;
  end: Date;
}

export interface CCDateTimePickerRawProps {
  features: Array<PICKER_FEATURES>;
  view: CALENDAR_VIEW;
}

export interface TimePickerOptions {
  disabledMeridiem?: boolean;
  step?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30;
}

export interface DialogOpenProps {
  open: boolean;
  onClose?: () => void;
}

export interface CCDatePickerProps
  extends Pick<CCDateTimePickerRawProps, "view"> {
  onChange?: (date: Date | CCDateTimePickerWeekValue) => void;
  value: Date | CCDateTimePickerWeekValue;
}

export interface HeaderPickerProps {
  onClickYear?: () => void;
  onClickMonth?: () => void;
}

export interface ComponentProps {
  component?: React.ReactElement;
}

export interface CCDateTimePickerProps
  extends CCDateTimePickerRawProps,
    CCDatePickerProps,
    TimePickerOptions,
    DialogOpenProps {}

export interface CCDateTimePickerHeaderProps
  extends CCDateTimePickerRawProps,
    Pick<CCDatePickerProps, "value"> {}

export interface CCDatePickerHeaderProps
  extends HeaderPickerProps,
    CCDatePickerProps,
    Pick<CCDateTimePickerRawProps, "view"> {}

export interface CCDatePickerCalendarProps
  extends CCDatePickerProps,
    ComponentProps,
    Pick<CCDateTimePickerRawProps, "view"> {}

export interface CCDatePickerCalendarSeriesProps
  extends CCDatePickerProps,
    ComponentProps,
    Pick<CCDateTimePickerRawProps, "view"> {
  date: Date | CCDateTimePickerWeekValue;
}

export interface CCDatePickerYearPickerProps
  extends HeaderPickerProps,
    CCDatePickerProps,
    Pick<CCDateTimePickerRawProps, "view"> {
  open: boolean;
}

export interface CCCCDatePickerMonthPickerProps
  extends CCDatePickerYearPickerProps {}

export interface CCTimePickerProps
  extends Omit<CCDatePickerProps, "view">,
    TimePickerOptions {
  value: Date;
}

export interface CCTMeridiemPickerProps
  extends Pick<TimePickerOptions, "disabledMeridiem"> {
  onChange?: (date: Date) => void;
  value: Date;
}

export function isDateTimePickerWeekValue(
  arg: any
): arg is CCDateTimePickerWeekValue {
  return "begin" in arg && "end" in arg;
}
