import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { getTeethString } from "../../Utils";
import TeethGraph from "../../types";

namespace Styled {
  export const UniversalTeethGraphContainer = styled("div", {
    label: "UniversalTeethGraphContainer"
  })<{ width?: number; background?: string }>(({ width, background }) => {
    return {
      width: width,
      height: "100%",
      border: 0,
      backgroundColor: background
    };
  });
  export const UniversalTeethGraphTypo = styled("div", {
    label: "UniversalTeethGraphContainer"
  })<{ foreground?: string }>(({ foreground }) => {
    return {
      color: foreground,
      overflow: "hidden",
      textOverflow: "ellipsis",
      wordWrap: "break-word"
    };
  });
}

const UniversalTeethGraph: React.FC<TeethGraph.Props> = props => {
  const {
    numbers = [],
    mode = TeethGraph.SYSTEM[1],
    background,
    foreground,
    width
  } = props;
  const teethString: string = useMemo(
    () => getTeethString(numbers, mode),
    [numbers, mode]
  );
  return (
    <Styled.UniversalTeethGraphContainer width={width} background={background}>
      <Styled.UniversalTeethGraphTypo foreground={foreground}>
        {teethString}
      </Styled.UniversalTeethGraphTypo>
    </Styled.UniversalTeethGraphContainer>
  );
};

export default UniversalTeethGraph;
