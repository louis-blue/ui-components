import TeethGraph from "../types";

function getLinearFromTeeth(
  numbers: Array<TeethGraph.Number> = []
): Array<number> {
  return numbers
    .reduce((acc, cur) => {
      if (TeethGraph.linear.includes(cur)) {
        acc.push(TeethGraph.linear.indexOf(cur));
      } else if (cur < 50) {
        let _upper = cur + 40;
        if (TeethGraph.isLinear(_upper)) {
          acc.push(TeethGraph.linear.indexOf(_upper));
        }
      } else {
        let _lower = cur + 40;
        if (TeethGraph.isLinear(_lower)) {
          acc.push(TeethGraph.linear.indexOf(_lower));
        }
      }

      return acc;
    }, [] as number[])
    .sort((a, b) => {
      return a - b;
    });
}

export default getLinearFromTeeth;
