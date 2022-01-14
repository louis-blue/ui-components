import React, { useEffect, useRef } from "react";
import { CCTeethGraphProps, TEETH_GRAPH_SYSTEM } from "../../CCTeethGraph";
import { drawFDICanvas } from "../../Utils";

const CCFDITeethGraph: React.FC<CCTeethGraphProps> = (
  props: CCTeethGraphProps
) => {
  const {
    width,
    height,
    foreground,
    background,
    numbers,
    missings
  }: CCTeethGraphProps = props;
  const canvasRef: React.MutableRefObject<HTMLCanvasElement | null> =
    useRef(null);
  useEffect(() => {
    if (canvasRef.current)
      drawFDICanvas({
        canvas: canvasRef.current,
        foreground,
        background,
        numbers,
        missings
      });
  }, [width, height, foreground, background, numbers, missings]);
  return <canvas ref={canvasRef} width={width} height={height} />;
};

CCFDITeethGraph.defaultProps = {
  foreground: "rgba(255, 255, 255, 1)",
  background: "rgba(0, 0, 0, 0)",
  numbers: [],
  missings: [],
  mode: TEETH_GRAPH_SYSTEM.FDI
};

export default CCFDITeethGraph;
