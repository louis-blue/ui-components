export const universal = {
  18: "1",
  17: "2",
  16: "3",
  15: "4",
  14: "5",
  13: "6",
  12: "7",
  11: "8",
  21: "9",
  22: "10",
  23: "11",
  24: "12",
  25: "13",
  26: "14",
  27: "15",
  28: "16",
  38: "17",
  37: "18",
  36: "19",
  35: "20",
  34: "21",
  33: "22",
  32: "23",
  31: "24",
  41: "25",
  42: "26",
  43: "27",
  44: "28",
  45: "29",
  46: "30",
  47: "31",
  48: "32",
  55: "A",
  54: "B",
  53: "C",
  52: "D",
  51: "E",
  61: "F",
  62: "G",
  63: "H",
  64: "I",
  65: "J",
  75: "K",
  74: "L",
  73: "M",
  72: "N",
  71: "O",
  81: "P",
  82: "Q",
  83: "R",
  84: "S",
  85: "T"
} as const;
export type TeethNumber = keyof typeof universal;
export type LinearNumber = TeethNumber | 0;

export const linear: ReadonlyArray<LinearNumber> = [
  0, 18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 0, 48, 47,
  46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38, 0, 55, 54, 53, 52, 51,
  61, 62, 63, 64, 65, 0, 85, 84, 83, 82, 81, 71, 72, 73, 74, 75
];

export function isTeethNumber(arg: any): arg is TeethNumber {
  return arg in universal;
}

export function isLinear(arg: any): arg is LinearNumber {
  return linear.includes(arg);
}

export const TEETH_GRAPH_SYSTEM = ["FDI", "UNIVERSAL"] as const;

export type TeethGraphSystem = typeof TEETH_GRAPH_SYSTEM[number];

export type TeethGraphProps = Partial<{
  width: number;
  height: number;
  foreground: string;
  background: string;
  numbers: Array<TeethNumber>;
  missings: Array<TeethNumber>;
  mode: TeethGraphSystem;
}>;

export type TeethGraphDrawProps = TeethGraphProps & {
  canvas: HTMLCanvasElement;
};
