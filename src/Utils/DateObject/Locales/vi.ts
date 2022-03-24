import dayjs from "dayjs";
import "dayjs/locale/vi";
import updateLocale from "dayjs/plugin/updateLocale";
import { LocaleConfig } from "../types";

dayjs.extend(updateLocale);
export const config: Partial<LocaleConfig> = {
  format: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM [năm] YYYY",
    LLL: "D MMMM [năm] YYYY HH:mm",
    LLLL: "dddd, D MMMM [năm] YYYY HH:mm",
    l: "DD/M/YYYY",
    ll: "D MMM YYYY",
    lll: "D MMM YYYY HH:mm",
    llll: "ddd, D MMM YYYY HH:mm"
  },
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LMD: "DD/MM",
    LMM: "MM/YYYY",
    LL: "D MMMM [năm] YYYY",
    LLL: "D MMMM [năm] YYYY HH:mm",
    LLLL: "dddd, D MMMM [năm] YYYY HH:mm",
    l: "DD/M/YYYY",
    ll: "D MMM YYYY",
    lll: "D MMM YYYY HH:mm",
    llll: "ddd, D MMM YYYY HH:mm",
    CALD: "DD/MM [(]ddd[)]"
  }
};
dayjs.updateLocale("vi", config);
export default config;
