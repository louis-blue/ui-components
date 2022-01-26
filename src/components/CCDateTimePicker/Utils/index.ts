import moment, { unitOfTime } from "moment/moment";

import "moment/locale/vi";
import "moment/locale/ru";
import "moment/locale/ar";

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
    if (typeof localStorage.getItem("lang") === "string") {
      moment.locale(localStorage.getItem("lang") as string);
    } else {
      moment.locale("en");
    }
    if (Boolean(date)) {
      this._date = date as Date;
    }
  }

  public static get monthFormat(): string[] {
    if (typeof localStorage.getItem("lang") === "string") {
      moment.locale(localStorage.getItem("lang") as string);
    } else {
      moment.locale("en");
    }
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

  public get hour() {
    return this._wrapObject.hour();
  }

  public get minute() {
    return this._wrapObject.minute();
  }

  public get second() {
    return this._wrapObject.second();
  }

  public get weekOfMonth() {
    const firstDayOfMonth = this.startOf("month");
    const firstDayOfWeek = this.startOf("week");
    const offset = firstDayOfWeek.diff(firstDayOfMonth, "days");
    console.log("offset", offset, (this.date + offset) / 7);

    return Math.floor((this.date + offset) / 7);
  }

  private get _wrapObject(): moment.Moment {
    return moment(this._date);
  }

  private static _makeWrapObject(date: Date): moment.Moment {
    return localStorage.getItem("lang")
      ? moment(date).locale(localStorage.getItem("lang") as string)
      : moment(date);
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

  public setDate(date: number): DateObject {
    return new DateObject(this._wrapObject.date(date as number).toDate());
  }

  public setHour(hour: number): DateObject {
    return new DateObject(this._wrapObject.hour(hour as number).toDate());
  }

  public setMinute(minute: number): DateObject {
    return new DateObject(this._wrapObject.minute(minute as number).toDate());
  }

  public setSecond(second: number): DateObject {
    return new DateObject(this._wrapObject.second(second as number).toDate());
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

  public isSameOrBefore(
    input: DateObject,
    granularity?: moment.unitOfTime.StartOf
  ): boolean {
    return this._wrapObject.isSameOrBefore(
      DateObject._makeWrapObject(input.toDate()),
      granularity
    );
  }

  public isSame(
    input: DateObject,
    granularity?: moment.unitOfTime.StartOf | Array<moment.unitOfTime.StartOf>
  ): boolean {
    if (typeof granularity === "string") {
      return this._wrapObject.isSame(
        DateObject._makeWrapObject(input.toDate()),
        granularity
      );
    }
    if (Array.isArray(granularity)) {
      return granularity.every(_granularity => {
        return this._wrapObject.isSame(
          DateObject._makeWrapObject(input.toDate()),
          _granularity
        );
      });
    }
    return false;
  }

  public isBetween(
    start: DateObject,
    end: DateObject,
    granularity?: unitOfTime.StartOf,
    inclusivity?: "()" | "[)" | "(]" | "[]"
  ): boolean {
    return this._wrapObject.isBetween(
      DateObject._makeWrapObject(start.toDate()),
      DateObject._makeWrapObject(end.toDate()),
      granularity,
      inclusivity
    );
  }
}

export default DateObject;
