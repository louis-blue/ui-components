export const LocaleString = ["en", "ru", "vi", "ar"] as const;
export const formatString = [
  "LT",
  "LTS",
  "L",
  "l",
  "LL",
  "ll",
  "LLL",
  "lll",
  "LLLL",
  "llll"
] as const;
export const customDefineString = ["LMD", "LMM", "CALD"] as const;

export type DefaultFormat = {
  [key in typeof formatString[number]]: string;
};

export type CustomDefineFormat = {
  [key in typeof customDefineString[number]]: string;
};

export type Format = Partial<DefaultFormat & CustomDefineFormat>;

export type PatternedFormatInput = keyof Format;
export type FormatInput = PatternedFormatInput | string;
export type PredefinedLocale = typeof LocaleString[number];

export interface LocaleConfig {
  format: Format;
  longDateFormat: Format;
  meridiemParse: string;
  meridiem: (hour: number) => string;
  weekStart: number;
  yearStart: number;
  isPM: (input: string) => boolean;
}

export type Formatter = Record<PredefinedLocale, Partial<LocaleConfig>>;

export function isFormatString(
  arg: any,
  obj: Format
): arg is PatternedFormatInput {
  if (typeof arg === "undefined") {
    return false;
  }
  return (
    (formatString.includes(arg) || customDefineString.includes(arg)) &&
    Object.keys(obj).includes(arg)
  );
}
