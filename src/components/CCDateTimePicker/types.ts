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

export interface CCDateTimePickerProps {
  open: boolean;
  onClose?: () => void;
  onChange?: (date: Date) => void;
  value: Date | null | CCDateTimePickerWeekValue;
  features?: Array<PICKER_FEATURES>;
  view?: CALENDAR_VIEW;
}

export interface CCDateTimePickerHeaderProps {
  value: Date | null | CCDateTimePickerWeekValue;
  features?: Array<PICKER_FEATURES>;
  view?: CALENDAR_VIEW;
}
