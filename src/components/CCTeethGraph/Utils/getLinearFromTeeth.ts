import { linear } from "./index";

function getLinearFromTeeth(
  numbers: Array<number> = [],
  indices: Array<number> = linear
): Array<number> {
  return numbers
    .map(number => {
      if (indices.includes(number)) {
        return indices.indexOf(number);
      } else if (number < 50) {
        return indices.indexOf(number + 40);
      } else {
        return indices.indexOf(number - 40);
      }
    })
    .sort((a: number, b: number) => {
      return a - b;
    });
}

export default getLinearFromTeeth;
