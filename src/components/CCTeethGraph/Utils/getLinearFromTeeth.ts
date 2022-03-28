import { isLinear, linear, TeethNumber } from "../types";

function getLinearFromTeeth(numbers: Array<TeethNumber> = []): Array<number> {
  return numbers
    .reduce((acc, cur) => {
      if (linear.includes(cur)) {
        acc.push(linear.indexOf(cur));
      } else if (cur < 50) {
        let _upper = cur + 40;
        if (isLinear(_upper)) {
          acc.push(linear.indexOf(_upper));
        }
      } else {
        let _lower = cur + 40;
        if (isLinear(_lower)) {
          acc.push(linear.indexOf(_lower));
        }
      }

      return acc;
    }, [] as number[])
    .sort((a, b) => {
      return a - b;
    });
}

export default getLinearFromTeeth;
