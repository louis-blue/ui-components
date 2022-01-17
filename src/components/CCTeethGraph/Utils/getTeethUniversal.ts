import { universal } from "./index";

function getTeethUniversal(number: number): string;
function getTeethUniversal(numbers: Array<number>): Array<string>;

function getTeethUniversal(
  numbers: number | Array<number>
): string | Array<string> {
  if (Array.isArray(numbers)) {
    let array: Array<string> = [];

    numbers.forEach(number => {
      array.push(universal[number.toString()]);
    });

    return array;
  } else {
    return universal[numbers.toString()];
  }
}

export default getTeethUniversal;
