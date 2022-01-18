import {
  getLinearFromTeeth,
  getTeethFromLinear,
  getTeethGroup,
  getTeethUniversal,
  linear
} from "./index";
import { CCTeethGraphSystem, TEETH_GRAPH_SYSTEM } from "../types";

function getTeethString(
  numbers: Array<number>,
  system: CCTeethGraphSystem,
  indices: Array<number> = linear
) {
  let t: string = "";
  if (system === TEETH_GRAPH_SYSTEM.UNIVERSAL) {
    const groups: Array<Array<string>> = getTeethGroup(numbers, null, 1)
      .map(group =>
        getTeethUniversal(group).sort((a: string, b: string) => {
          return a.localeCompare(b);
        })
      )
      .sort((a: Array<string>, b: Array<string>) => {
        return b[0].localeCompare(a[0]);
      });

    groups.forEach((group, index) => {
      const prefix: string = index === 0 ? "#" : "";
      const postfix: string = index + 1 < groups.length ? "," : "";

      if (group.length === 1) {
        t = t + `${prefix}${group[0]}${postfix}`;
      } else {
        t = t + `${prefix}${group[0]}-${group[group.length - 1]}${postfix}`;
      }
    });
  } else {
    let sequences: Array<number> = getLinearFromTeeth(numbers, indices).concat([
      99999
    ]);
    let array: Array<number> = [];
    sequences.forEach((index: number) => {
      if (array.length === 0) {
        array.push(index);
        return;
      }
      if (array[array.length - 1] + 1 === index) {
        array.push(index);
        return;
      }
      const list = getTeethFromLinear(array, indices);
      // console.log(list);

      if (t.length === 0) {
        t += "#";
      } else {
        t += ",";
      }

      if (list.length === 1) {
        t += `${list[0]}`;
      } else {
        t += `${list[0]}-${list[list.length - 1]}`;
      }

      array = [index];
    });
  }
  return t;
}

export default getTeethString;
