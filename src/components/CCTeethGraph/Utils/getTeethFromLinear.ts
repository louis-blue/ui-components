import TeethGraph from "../types";

function getTeethFromLinear(
  numbers: Array<number> = []
): Array<TeethGraph.Number> {
  return numbers.reduce((acc, cur) => {
    if (TeethGraph.isLinear(TeethGraph.linear[cur])) {
      let _res = TeethGraph.linear[cur];
      if (TeethGraph.isTeethNumber(_res)) {
        acc.push(_res);
      }
    }
    return acc;
  }, [] as Array<TeethGraph.Number>);
}

export default getTeethFromLinear;
