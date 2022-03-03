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
  const { step }: CCSchedulerWeekDropLayerProps = props;
  const range: Array<number> = useMemo(() => {
    let _arr: Array<number> = new Array((24 * 60) / step).fill(0);
    return _arr;
  }, [step]);
  // const dropLayerRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  // const [collectedProps, drop] = useDrop(() => ({
  //   accept: DropTarget.Week,
  //   hover: (item: DragObject, monitor) => {
  //     let _offsetTop = item?.ref?.current?.offsetTop || 0;
  //     let _offsetLeft = item?.ref?.current?.offsetLeft || 0;
  //     let _clientOffset = monitor.getClientOffset();
  //     let _clientY = _clientOffset?.y || 0;
  //     let _pageY = _clientY + _offsetTop;
  //
  //     console.log("hover", _pageY, _offsetLeft);
  //   },
  //   drop: (item, monitor) => {},
  //   collect: monitor => {
  //     return {
  //       targetId: monitor.getHandlerId(),
  //       isOver: monitor.isOver(),
  //       canDrop: monitor.canDrop(),
  //       initialClientOffset: monitor.getInitialClientOffset(),
  //       initialSourceClientOffset: monitor.getInitialSourceClientOffset(),
  //       clientOffset: monitor.getClientOffset(),
  //       differenceFromInitialOffset: monitor.getDifferenceFromInitialOffset(),
  //       sourceClientOffset: monitor.getSourceClientOffset()
  //     };
  //   }
  // }));
  // console.log("collectedProps", collectedProps);
  return (
    <LSchedulerWeekDropLayer>
      {range.map((el, index) => {
        return (
          <CCSchedulerWeekDropZone key={index} index={index} step={step} />
        );
      })}
    </LSchedulerWeekDropLayer>
  );
};
export default CCSchedulerWeekDropLayer;
