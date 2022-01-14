import React from "react";
import PropTypes from "prop-types";

export enum TEETH_GRAPH_SYSTEM {
  FDI = "TEETH_GRAPH_SYSTEM_FDI",
  UNIVERSAL = "TEETH_GRAPH_SYSTEM_UNIVERSAL",
}

type CCTeethGraphSystem = TEETH_GRAPH_SYSTEM.FDI | TEETH_GRAPH_SYSTEM.UNIVERSAL;

export interface CCTeethGraphProps {
  width?: number;
  height?: number;
  foreground?: string;
  background?: string;
  numbers?: Array<number>;
  missings?: Array<number>;
  mode?: TEETH_GRAPH_SYSTEM;
}

const CCTeethGraph: React.FC<CCTeethGraphProps> = (
  props: CCTeethGraphProps
) => {
  return <div>{"test"}</div>;
};

CCTeethGraph.defaultProps = {
  foreground: "rgba(255, 255, 255, 1)",
  background: "rgba(0, 0, 0, 0)",
  numbers: [],
  missings: [],
  mode: TEETH_GRAPH_SYSTEM.FDI,
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
  missings: PropTypes.array,
};

export default CCTeethGraph;
