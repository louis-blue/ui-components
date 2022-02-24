import dayjs from "dayjs";
import * as ru from "./Locales/ru";
import * as en from "./Locales/en";
import * as ar from "./Locales/ar";
import * as vi from "./Locales/vi";

import { ManipulateType, OpUnitType, QUnitType } from "dayjs/esm";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import preParsePostFormat from "dayjs/plugin/preParsePostFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";
import pluralGetSet from "dayjs/plugin/pluralGetSet";

dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(preParsePostFormat);
dayjs.extend(advancedFormat);
dayjs.extend(pluralGetSet);

interface DateObjectInterface {
  toDate(): Date;

  startOf(unitOfTime: OpUnitType): DateObject;

  endOf(unitOfTime: OpUnitType): DateObject;

  format(format: string): string;

  diff(
    target: DateObject,
    unitOfTime: QUnitType | OpUnitType | undefined
  ): number;

  setYear(year: number): DateObject;

  setMonth(month: number): DateObject;

  add(unit: string, amount: number): DateObject;

  subtract(unit: string, amount: number): DateObject;

  get date(): number;
}

class DateObject implements DateObjectInterface {
  private readonly _date: Date = new Date();
  private readonly _formatter: {
    [key: string]: {
      config: { format: { [key: string]: any }; [key: string]: any };
    };
  } = {
    en,
    ru,
    ar,
    vi
  };

  constructor(date?: Date | null | undefined) {
    if (typeof localStorage.getItem("lang") === "string") {
      dayjs.locale(localStorage.getItem("lang") as string);
    } else {
      dayjs.locale("en");
    }
    if (Boolean(date)) {
      this._date = date as Date;
    }
  }

  public static get monthFormat(): string[] {
    if (typeof localStorage.getItem("lang") === "string") {
      dayjs.locale(localStorage.getItem("lang") as string);
    } else {
      dayjs.locale("en");
    }
    return dayjs.monthsShort();
  }

  public static get meridiemFormat(): string[] {
    if (typeof localStorage.getItem("lang") === "string") {
      dayjs.locale(localStorage.getItem("lang") as string);
    } else {
      dayjs.locale("en");
    }
    return [dayjs().hour(0).format("A"), dayjs().hour(12).format("A")];
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

    return Math.floor((this.date + offset) / 7);
  }

  private get _wrapObject(): dayjs.Dayjs {
    return dayjs(this._date);
  }

  private static _makeWrapObject(date: Date): dayjs.Dayjs {
    return localStorage.getItem("lang")
      ? dayjs(date).locale(localStorage.getItem("lang") as string)
      : dayjs(date);
  }

  public toDate(): Date {
    return this._wrapObject.toDate();
  }

  public startOf(unitOfTime: OpUnitType): DateObject {
    return new DateObject(this._wrapObject.startOf(unitOfTime).toDate());
  }

  public endOf(unitOfTime: OpUnitType): DateObject {
    return new DateObject(this._wrapObject.endOf(unitOfTime).toDate());
  }

  public format(format: string): string {
    let _format = format;
    if (
      Boolean(this._formatter[dayjs.locale()]) &&
      Boolean(
        this._formatter[dayjs.locale()]?.config?.format?.hasOwnProperty(format)
      )
    ) {
      _format = this._formatter[dayjs.locale()].config.format[format];
    }

    return this._wrapObject.format(_format);
  }

  public diff(
    target: DateObject,
    unitOfTime: QUnitType | OpUnitType | undefined
  ): number {
    return this._wrapObject.diff(dayjs(target.toDate()), unitOfTime);
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

  public add(unit: ManipulateType, amount: number): DateObject {
    return new DateObject(
      this._wrapObject.add(amount, unit as ManipulateType).toDate()
    );
  }

  public subtract(unit: ManipulateType, amount: number): DateObject {
    return new DateObject(
      this._wrapObject.subtract(amount, unit as ManipulateType).toDate()
    );
  }

  public isSameOrBefore(input: DateObject, granularity?: OpUnitType): boolean {
    return this._wrapObject.isSameOrBefore(
      DateObject._makeWrapObject(input.toDate()),
      granularity
    );
  }

  public isSame(
    input: DateObject,
    granularity?: OpUnitType | Array<OpUnitType>
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
    granularity?: OpUnitType,
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
