import { isLinear, isTeethNumber, linear, TeethNumber } from "../types";

function getTeethFromLinear(numbers: Array<number> = []): Array<TeethNumber> {
  return numbers.reduce((acc, cur) => {
    if (isLinear(linear[cur])) {
      let _res = linear[cur];
      if (isTeethNumber(_res)) {
        acc.push(_res);
      }
    }
    return acc;
  }, [] as Array<TeethNumber>);
}

export default getTeethFromLinear;
