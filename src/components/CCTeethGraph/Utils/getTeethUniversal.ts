import TeethGraph from "../types";

function getTeethUniversal(number: TeethGraph.Number): string;
function getTeethUniversal(numbers: Array<TeethGraph.Number>): Array<string>;

function getTeethUniversal(
  numbers: TeethGraph.Number | Array<TeethGraph.Number>
): string | Array<string> {
  if (Array.isArray(numbers)) {
    let array: Array<string> = [];

    numbers.forEach(number => {
      if (TeethGraph.isTeethNumber(number)) {
        array.push(TeethGraph.universal[number]);
      }
    });
    return array;
  } else {
    return TeethGraph.isTeethNumber(numbers)
      ? TeethGraph.universal[numbers]
      : "";
  }
}

export default getTeethUniversal;
