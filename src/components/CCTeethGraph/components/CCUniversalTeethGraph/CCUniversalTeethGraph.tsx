import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { TEETH_GRAPH_SYSTEM, TeethGraphProps } from "../../types";
import { getTeethString } from "../../Utils";

const LUniversalTeethGraphContainer = styled("div", {
  label: "LUniversalTeethGraphContainer"
})<{ width?: number; background?: string }>(({ width, background }) => {
  return {
    width: width,
    height: "100%",
    border: 0,
    backgroundColor: background
  };
});
const LUniversalTeethGraphTypo = styled("div", {
  label: "LUniversalTeethGraphContainer"
})<{ foreground?: string }>(({ foreground }) => {
  return {
    color: foreground,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word"
  };
});

const UniversalTeethGraph: React.FC<TeethGraphProps> = props => {
  const {
    numbers = [],
    mode = TEETH_GRAPH_SYSTEM[1],
    background,
    foreground,
    width
  } = props;
  const teethString: string = useMemo(
    () => getTeethString(numbers, mode),
    [numbers, mode]
  );
  return (
    <LUniversalTeethGraphContainer width={width} background={background}>
      <LUniversalTeethGraphTypo foreground={foreground}>
        {teethString}
      </LUniversalTeethGraphTypo>
    </LUniversalTeethGraphContainer>
  );
};

export default UniversalTeethGraph;
