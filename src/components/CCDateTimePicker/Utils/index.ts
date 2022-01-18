import moment from "moment/moment";

interface DateObjectInterface {
  toDate(): Date;

  startOf(unitOfTime: moment.unitOfTime.StartOf): DateObject;

  endOf(unitOfTime: moment.unitOfTime.StartOf): DateObject;

  format(format: string): string;

  diff(
    target: DateObject,
    unitOfTime: moment.unitOfTime.Diff | undefined
  ): number;

  setYear(year: number): DateObject;

  setMonth(month: number): DateObject;

  add(unit: string, amount: number): DateObject;

  subtract(unit: string, amount: number): DateObject;
}

class DateObject implements DateObjectInterface {
  private readonly _date: Date = new Date();

  constructor(date: Date | undefined | null) {
    if (Boolean(date)) {
      this._date = date as Date;
    }
  }

  public static get monthFormat(): string[] {
    return moment.localeData().months();
  }

  public get date() {
    return this._wrapObject.date();
  }

  public get month() {
    return this._wrapObject.month();
  }

  public get year() {
    return this._wrapObject.year();
  }

  public get weekOfMonth() {
    const firstDayOfMonth = this.startOf("month");
    const firstDayOfWeek = this.startOf("week");
    const offset = firstDayOfMonth.diff(firstDayOfWeek, "days");

    return Math.ceil((this.date + offset) / 7);
  }

  private get _wrapObject(): moment.Moment {
    return moment(this._date);
  }

  public toDate(): Date {
    return this._date;
  }

  public startOf(unitOfTime: moment.unitOfTime.StartOf): DateObject {
    return new DateObject(this._wrapObject.startOf(unitOfTime).toDate());
  }

  public endOf(unitOfTime: moment.unitOfTime.StartOf): DateObject {
    return new DateObject(this._wrapObject.endOf(unitOfTime).toDate());
  }

  public format(format: string): string {
    return this._wrapObject.format(format);
  }

  public diff(
    target: DateObject,
    unitOfTime: moment.unitOfTime.Diff | undefined
  ): number {
    return this._wrapObject.diff(moment(target.toDate()), unitOfTime);
  }

  public setYear(year: number): DateObject {
    return new DateObject(this._wrapObject.year(year as number).toDate());
  }

  public setMonth(month: number): DateObject {
    return new DateObject(this._wrapObject.month(month as number).toDate());
  }

  public add(unit: string, amount: number): DateObject {
    return new DateObject(
      this._wrapObject
        .add(
          amount as moment.DurationInputArg1,
          unit as moment.DurationInputArg2
        )
        .toDate()
    );
  }

  public subtract(unit: string, amount: number): DateObject {
    return new DateObject(
      this._wrapObject
        .subtract(
          amount as moment.DurationInputArg1,
          unit as moment.DurationInputArg2
        )
        .toDate()
    );
  }
}

export default DateObject;
