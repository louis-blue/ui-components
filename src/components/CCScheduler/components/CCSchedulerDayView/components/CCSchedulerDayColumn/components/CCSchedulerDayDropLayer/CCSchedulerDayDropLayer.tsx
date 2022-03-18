import { CCSchedulerDayDropLayerProps } from "../../../../../../types";
import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { CCSchedulerDayDropZone } from "./components";
import { DateObject } from "../../../../../../../../Utils";

const LSchedulerDayDropLayer = styled(`div`, {
  label: "LSchedulerDayDropLayer"
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
const CCSchedulerDayDropLayer: React.FC<
  CCSchedulerDayDropLayerProps
> = props => {
  const { date, step, onChange, onClickCell }: CCSchedulerDayDropLayerProps =
    props;
  const range: Array<number> = useMemo(() => {
    let _arr: Array<number> = new Array((24 * 60) / step).fill(0);
    return _arr;
  }, [step]);
  const currentDate = useMemo(() => {
    return new DateObject(date).startOf("day").toDate();
  }, [date]);
  return (
    <LSchedulerDayDropLayer>
      {range.map((el, index) => {
        return (
          <CCSchedulerDayDropZone
            date={currentDate}
            key={index}
            index={index}
            step={step}
            onChange={onChange}
            onClickCell={onClickCell}
          />
        );
      })}
    </LSchedulerDayDropLayer>
  );
};
export default CCSchedulerDayDropLayer;
