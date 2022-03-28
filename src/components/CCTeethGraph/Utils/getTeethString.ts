import {
  getLinearFromTeeth,
  getTeethFromLinear,
  getTeethGroup,
  getTeethUniversal,
} from "./index";
import { TEETH_GRAPH_SYSTEM, TeethGraphSystem, TeethNumber } from "../types";

function getTeethString(
  numbers: Array<TeethNumber>,
  system: TeethGraphSystem
): string {
  if (system === TEETH_GRAPH_SYSTEM[1]) {
    return `#${getTeethGroup(numbers, null, 1)
      .map((group) =>
        getTeethUniversal(group).sort((a, b) => {
          return a.localeCompare(b);
        })
      )
      .sort((a, b) => {
        if (typeof a[0] === "string" && typeof b[0] === "string") {
          return b[0].localeCompare(a[0]);
        }
        return 0;
      })
      .reduce((acc, cur) => {
        if (cur.length === 1) {
          acc.push(`${cur[0]}`);
        } else {
          acc.push(`${cur[0]}-${cur[cur.length - 1]}`);
        }
        return acc;
      }, [])
      .join(",")}`;
  } else {
    let t = "";
    let sequences = getLinearFromTeeth(numbers).concat([99999]);
    let array: Array<number> = [];
    sequences.forEach((index) => {
      if (array.length === 0) {
        array.push(index);
        return;
      }
      if (array[array.length - 1] + 1 === index) {
        array.push(index);
        return;
      }
      const list = getTeethFromLinear(array);
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
    return t;
  }
}

export default getTeethString;
