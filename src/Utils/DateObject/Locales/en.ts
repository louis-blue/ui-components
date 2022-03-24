import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { LocaleConfig } from "../types";

dayjs.extend(updateLocale);

const makeOptionByRegion = () => {
  switch (process?.env?.REACT_APP_REGION) {
    case "egypt":
      return {
        weekStart: 6,
        yearStart: 12
      };
    case "russia":
      return {
        weekStart: 1,
        yearStart: 4
      };
    case "vietnam":
      return {
        weekStart: 1,
        yearStart: 4
      };
    default:
      return {};
  }
};
export const format = {
  LT: "h:mm A",
  LTS: "h:mm:ss A",
  L: "MM/DD/YYYY",
  LMD: "MM/DD",
  LMM: "MM/YYYY",
  l: "M/D/YYYY",
  LL: "MMMM Do YYYY",
  ll: "MMM D YYYY",
  LLL: "MMMM Do YYYY LT",
  lll: "MMM D YYYY LT",
  LLLL: "dddd, MMMM Do YYYY LT",
  llll: "ddd, MMM D YYYY LT",
  CALD: "MM/DD [(]ddd[)]"
};
export const longDateFormat = {
  LT: "h:mm A",
  LTS: "h:mm:ss A",
  L: "MM/DD/YYYY",
  LMD: "MM/DD",
  LMM: "MM/YYYY",
  l: "M/D/YYYY",
  LL: "MMMM Do YYYY",
  ll: "MMM D YYYY",
  LLL: "MMMM Do YYYY LT",
  lll: "MMM D YYYY LT",
  LLLL: "dddd, MMMM Do YYYY LT",
  llll: "ddd, MMM D YYYY LT",
  CALD: "MM/DD [(]ddd[)]"
};
export const config: Partial<LocaleConfig> = {
  format,
  longDateFormat,
  ...makeOptionByRegion()
};
dayjs.updateLocale("en", config);
export default config;
