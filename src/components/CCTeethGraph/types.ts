export enum TEETH_GRAPH_SYSTEM {
  FDI = "TEETH_GRAPH_SYSTEM_FDI",
  UNIVERSAL = "TEETH_GRAPH_SYSTEM_UNIVERSAL"
}

export type CCTeethGraphSystem =
  | TEETH_GRAPH_SYSTEM.FDI
  | TEETH_GRAPH_SYSTEM.UNIVERSAL;

export interface CCTeethGraphProps {
  width?: number;
  height?: number;
  foreground?: string;
  background?: string;
  numbers?: Array<number>;
  missings?: Array<number>;
  mode?: CCTeethGraphSystem;
}

export interface CCTeethGraphDrawProps extends CCTeethGraphProps {
  canvas: HTMLCanvasElement;
}
