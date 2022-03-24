import dayjs from "dayjs";
import "dayjs/locale/ru";
import updateLocale from "dayjs/plugin/updateLocale";
import { LocaleConfig } from "../types";

dayjs.extend(updateLocale);

export const config: Partial<LocaleConfig> = {
  format: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD.MM.YYYY",
    LMD: "DD.MM",
    LMM: "MM.YYYY",
    LL: "D MMMM YYYY г.",
    LLL: "D MMMM YYYY г., H:mm",
    LLLL: "dddd, D MMMM YYYY г., H:mm",
    CALD: "DD.MM [(]ddd[)]"
  }
};
dayjs.updateLocale("ru", config);
export default config;
