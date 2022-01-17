import moment from "moment";

function _wrapObject(input: Date): moment.Moment {
  return moment(input);
}

function startOf(
  input: Date,
  unitOfTime: moment.unitOfTime.StartOf
): moment.Moment {
  return _wrapObject(input).clone().startOf(unitOfTime);
}

function endOf(
  input: Date,
  unitOfTime: moment.unitOfTime.StartOf
): moment.Moment {
  return _wrapObject(input).clone().endOf(unitOfTime);
}

function diff(
  a: moment.Moment,
  b: moment.Moment,
  unitOfTime: moment.unitOfTime.Diff | undefined
): number {
  return a.diff(b, unitOfTime);
}

function getDate(input: Date) {
  return _wrapObject(input).clone().date();
}

function weekOfMonth(input = new Date()) {
  const firstDayOfMonth = startOf(input, "month");
  const firstDayOfWeek = startOf(input, "week");
  const offset = diff(firstDayOfMonth, firstDayOfWeek, "days");

  return Math.ceil((getDate(input) + offset) / 7);
}

function format(input: Date | null, format: string): string {
  if (input) return _wrapObject(input).format(format);
  else return "";
}

const DatePickerUtils = {
  weekOfMonth,
  startOf,
  endOf,
  diff,
  format
};

export default DatePickerUtils;
