import { getLinearFromTeeth, getTeethFromLinear, linear } from "./index";

function getTeethGroup(
  numbers: Array<number>,
  equal: number | null,
  least: number | null,
  indices: Array<number> = linear
): Array<Array<number>> {
  let sequences = getLinearFromTeeth(numbers, indices).concat([99999]);
  let group: Array<Array<number>> = [];
  let array: Array<number> = [];

  sequences.forEach(index => {
    if (array.length === 0 || array[array.length - 1] + 1 === index) {
      array.push(index);
    } else if (least && array.length >= least) {
      group.push(getTeethFromLinear(array, indices));
      array = [index];
    } else {
      array = [index];
    }

    if (equal && array.length === equal) {
      group.push(getTeethFromLinear(array, indices));
      array = [index];
    }
  });

  return group;
}

export default getTeethGroup;
