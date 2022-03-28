import { isTeethNumber, TeethNumber, universal } from "../types";

function getTeethUniversal(number: TeethNumber): string;
function getTeethUniversal(numbers: Array<TeethNumber>): Array<string>;

function getTeethUniversal(
  numbers: TeethNumber | Array<TeethNumber>
): string | Array<string> {
  if (Array.isArray(numbers)) {
    let array: Array<string> = [];

    numbers.forEach((number) => {
      if (isTeethNumber(number)) {
        array.push(universal[number]);
      }
    });
    return array;
  } else {
    return isTeethNumber(numbers) ? universal[numbers] : "";
  }
}

export default getTeethUniversal;
