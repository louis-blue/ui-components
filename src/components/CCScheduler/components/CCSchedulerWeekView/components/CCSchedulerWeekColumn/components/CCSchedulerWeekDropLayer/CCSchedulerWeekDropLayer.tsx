import { CCSchedulerWeekDropLayerProps } from "../../../../../../types";
import React, { useMemo } from "react";
import styled from "@emotion/styled";
import CCSchedulerWeekDropZone from "./components/CCSchedulerWeekDropZone";

const LSchedulerWeekDropLayer = styled(`div`, {
  label: "LSchedulerWeekDropLayer"
})<{}>(({}) => {
  // let _isOver = isOver ? { background: "blue" } : {};
  return {
    position: "absolute",
    width: "100%",
    height: "100%",
    // background: "red",
    boxSizing: "border-box",
    // opacity: "0.2",
    display: "grid"
    // ..._isOver
  };
});
const CCSchedulerWeekDropLayer: React.FC<
  CCSchedulerWeekDropLayerProps
> = props => {
  const { date, step, onChange, onClickCell }: CCSchedulerWeekDropLayerProps =
    props;
  const range: Array<number> = useMemo(() => {
    let _arr: Array<number> = new Array((24 * 60) / step).fill(0);
    return _arr;
  }, [step]);
  return (
    <LSchedulerWeekDropLayer>
      {range.map((el, index) => {
        return (
          <CCSchedulerWeekDropZone
            date={date}
            key={index}
            index={index}
            step={step}
            onChange={onChange}
            onClickCell={onClickCell}
          />
        );
      })}
    </LSchedulerWeekDropLayer>
  );
};
export default CCSchedulerWeekDropLayer;
