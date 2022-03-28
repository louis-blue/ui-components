import React, { useEffect, useRef } from "react";
import { TeethGraphProps } from "../../types";
import { drawFDICanvas } from "../../Utils";

const FDITeethGraph: React.FC<TeethGraphProps> = props => {
  const {
    width = 160,
    height = 80,
    foreground,
    background,
    numbers,
    missings
  } = props;
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

FDITeethGraph.defaultProps = {
  foreground: "rgba(255, 255, 255, 1)",
  background: "rgba(0, 0, 0, 0)",
  numbers: [],
  missings: []
};

export default FDITeethGraph;
