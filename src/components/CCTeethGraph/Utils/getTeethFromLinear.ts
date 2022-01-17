import { linear } from "./index";

function getTeethFromLinear(
  numbers: Array<number> = [],
  indices: Array<number> = linear
): Array<number> {
  return numbers.map(index => indices[index]);
}

export default getTeethFromLinear;
