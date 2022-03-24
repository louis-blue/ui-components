import dayjs from "dayjs";
import ru from "./Locales/ru";
import en from "./Locales/en";
import ar from "./Locales/ar";
import vi from "./Locales/vi";

import { ManipulateType, OpUnitType, QUnitType } from "dayjs/esm";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import preParsePostFormat from "dayjs/plugin/preParsePostFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";
import pluralGetSet from "dayjs/plugin/pluralGetSet";
import {
  FormatInput,
  Formatter,
  isFormatString,
  LocaleString,
  PredefinedLocale
} from "./types";

dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(preParsePostFormat);
dayjs.extend(advancedFormat);
dayjs.extend(pluralGetSet);

class DateObject {
  private readonly _date: Date = new Date();
  private readonly _formatter: Formatter = {
    en: en,
    ru: ru,
    ar: ar,
    vi: vi
  };

  constructor(date?: Date | null | undefined) {
    let _lang = localStorage.getItem("lang");
    if (_lang) {
      dayjs.locale(_lang);
    } else {
      dayjs.locale("en");
    }
    if (date) {
      this._date = date;
    }
  }

  public static get monthFormat(): string[] {
    let _lang = localStorage.getItem("lang");
    if (_lang) {
      dayjs.locale(_lang);
    } else {
      dayjs.locale("en");
    }
    return dayjs.monthsShort();
  }

  public static get meridiemFormat(): string[] {
    let _lang = localStorage.getItem("lang");
    if (_lang) {
      dayjs.locale(_lang);
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
    let _lang = localStorage.getItem("lang");
    return _lang ? dayjs(date).locale(_lang) : dayjs(date);
  }

  public toDate(): Date {
    return this._wrapObject.toDate();
  }

  public startOf(unitOfTime: OpUnitType) {
    return new DateObject(this._wrapObject.startOf(unitOfTime).toDate());
  }

  public endOf(unitOfTime: OpUnitType): DateObject {
    return new DateObject(this._wrapObject.endOf(unitOfTime).toDate());
  }

  public getLocale(): PredefinedLocale {
    let _locale: PredefinedLocale | string = dayjs.locale();
    let _predefineLocale = LocaleString.find(item => item === _locale);
    if (_predefineLocale) {
      return _predefineLocale;
    } else {
      return LocaleString[0];
    }
  }

  public format(format: FormatInput): string {
    let _formatString: FormatInput = format;
    let _locale: PredefinedLocale = this.getLocale();
    let _formatter = this._formatter[_locale];

    if (
      !_formatter.hasOwnProperty("format") ||
      !(typeof _formatter?.format === "object")
    ) {
      return this._wrapObject.format(_formatString);
    }

    if (isFormatString(_formatString, _formatter.format)) {
      let _result = _formatter.format[_formatString];
      return this._wrapObject.format(_result);
    }

    return this._wrapObject.format(_formatString);
  }

  public diff(
    target: DateObject,
    unitOfTime: QUnitType | OpUnitType | undefined
  ): number {
    return this._wrapObject.diff(dayjs(target.toDate()), unitOfTime);
  }

  public setYear(year: number): DateObject {
    return new DateObject(this._wrapObject.year(year).toDate());
  }

  public setMonth(month: number): DateObject {
    return new DateObject(this._wrapObject.month(month).toDate());
  }

  public setDate(date: number): DateObject {
    return new DateObject(this._wrapObject.date(date).toDate());
  }

  public setHour(hour: number): DateObject {
    return new DateObject(this._wrapObject.hour(hour).toDate());
  }

  public setMinute(minute: number): DateObject {
    return new DateObject(this._wrapObject.minute(minute).toDate());
  }

  public setSecond(second: number): DateObject {
    return new DateObject(this._wrapObject.second(second).toDate());
  }

  public add(unit: ManipulateType, amount: number): DateObject {
    return new DateObject(this._wrapObject.add(amount, unit).toDate());
  }

  public subtract(unit: ManipulateType, amount: number): DateObject {
    return new DateObject(this._wrapObject.subtract(amount, unit).toDate());
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
