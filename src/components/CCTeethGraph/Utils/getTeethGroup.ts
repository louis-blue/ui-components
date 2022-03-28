import { getLinearFromTeeth, getTeethFromLinear } from "./index";
import { TeethNumber } from "../types";

function getTeethGroup(
  numbers: Array<TeethNumber>,
  equal: number | null,
  least: number | null
): Array<Array<TeethNumber>> {
  let sequences = getLinearFromTeeth(numbers).concat([99999]);
  let group: Array<Array<TeethNumber>> = [];
  let array: Array<number> = [];
  sequences.forEach((index) => {
    if (array.length === 0 || array[array.length - 1] + 1 === index) {
      array.push(index);
    } else if (least && array.length >= least) {
      group.push(getTeethFromLinear(array));
      array = [index];
    } else {
      array = [index];
    }

    if (equal && array.length === equal) {
      group.push(getTeethFromLinear(array));
      array = [index];
    }
  });

  return group;
}

export default getTeethGroup;
