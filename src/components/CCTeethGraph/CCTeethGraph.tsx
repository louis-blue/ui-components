import React from "react";
import PropTypes from "prop-types";
import CCFDITeethGraph from "./components/CCFDITeethGraph";
import { CCUniversalTeethGraph } from "./components";
import { TEETH_GRAPH_SYSTEM, TeethGraphProps } from "./types";

const CCTeethGraph: React.FC<TeethGraphProps> = (props: TeethGraphProps) => {
  const { mode, ...others }: TeethGraphProps = props;
  if (mode === TEETH_GRAPH_SYSTEM[0]) {
    return <CCFDITeethGraph {...others} />;
  } else {
    return <CCUniversalTeethGraph {...others} />;
  }
};

CCTeethGraph.defaultProps = {
  foreground: "rgba(0, 0, 0, 1)",
  background: "rgba(0, 0, 0, 0)",
  numbers: [],
  missings: [],
  mode: TEETH_GRAPH_SYSTEM[0],
  width: 160,
  height: 40
};

CCTeethGraph.propTypes = {
  /** 가로 길이 (가로 세로 비율 : 4:1) */
  width: PropTypes.number,
  /** 세로 길이 (가로 세로 비율 : 4:1) */
  height: PropTypes.number,
  /** 글자색 */
  foreground: PropTypes.string,
  /** 배경색 */
  background: PropTypes.string,
  /** 선택된 치식 */
  numbers: PropTypes.array,
  missings: PropTypes.array
};

export default CCTeethGraph;
