import { getLinearFromTeeth, getTeethFromLinear } from "./index";
import TeethGraph from "../types";

function getTeethGroup(
  numbers: Array<TeethGraph.Number>,
  equal: number | null,
  least: number | null
): Array<Array<TeethGraph.Number>> {
  let sequences = getLinearFromTeeth(numbers).concat([99999]);
  let group: Array<Array<TeethGraph.Number>> = [];
  let array: Array<number> = [];
  sequences.forEach(index => {
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
