import React, { useMemo } from "react";
import { getTeethString } from "../../Utils";
import { CCTeethGraphProps, TEETH_GRAPH_SYSTEM } from "../../types";
import styled from "@emotion/styled";

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

const CCUniversalTeethGraph: React.FC<CCTeethGraphProps> = props => {
  const {
    numbers = [],
    mode = TEETH_GRAPH_SYSTEM.UNIVERSAL,
    background,
    foreground,
    width
  }: CCTeethGraphProps = props;
  const teethString: string = useMemo(
    () => getTeethString(numbers, mode),
    [numbers, mode]
  );
  console.log();
  return (
    <LUniversalTeethGraphContainer width={width} background={background}>
      <LUniversalTeethGraphTypo foreground={foreground}>
        {teethString}
      </LUniversalTeethGraphTypo>
    </LUniversalTeethGraphContainer>
  );
};

export default CCUniversalTeethGraph;
