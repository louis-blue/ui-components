import React, { MutableRefObject } from "react";
import styled from "@emotion/styled";
import {
  CCSchedulerWeekDropZoneProps,
  DragObject,
  DropTarget,
  TimeStep
} from "../../../../../../../../types";
import { useDrop } from "react-dnd";
import { DateObject } from "../../../../../../../../../../Utils";

const LSchedulerWeekDropZone = styled(`div`, {
  label: "LSchedulerWeekDropZone"
})(({ theme }) => {
  return {
    borderRight: "1px solid #000",
    position: "relative",
    width: "100%",
    height: 20,
    textAlign: "left",
    boxSizing: "border-box",
    background: "transparent"
  };
});

const LSchedulerWeekHoverItem = styled(`div`, {
  label: "LSchedulerWeekHoverItem"
})<{
  dateBegin?: Date;
  dateEnd?: Date;
  isOver?: boolean;
  step: TimeStep;
  dragRef?: MutableRefObject<HTMLDivElement | null>;
}>(({ theme, isOver, step, dateBegin, dateEnd, dragRef }) => {
  // console.log(dateBegin, dateEnd);
  let _dateBegin = new DateObject(dateBegin);
  let _dateEnd = new DateObject(dateEnd);
  let _diff = _dateEnd.diff(_dateBegin, "minutes");
  console.log(_diff, dateBegin, dateEnd);
  return {
    border: "1px solid #000",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    // height: isOver ? (_diff / step) * 20 : 0,
    height: (_diff / step) * 20,
    pointerEvents: "none",
    background: "white",
    zIndex: 3
  };
});

const CCSchedulerWeekDropZone: React.FC<
  CCSchedulerWeekDropZoneProps
> = props => {
  const { index, step }: CCSchedulerWeekDropZoneProps = props;
  const [{ isOver, item }, drop] = useDrop(() => ({
    accept: DropTarget.Week,
    drop: (item, monitor) => {},
    collect: monitor => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        item: monitor.getItem() as DragObject
      };
    }
  }));
  return (
    <LSchedulerWeekDropZone key={index} ref={drop}>
      {/*{isOver && (*/}
      {isOver && (
        <LSchedulerWeekHoverItem
          step={step}
          dateBegin={item?.event?.dateBegin}
          dateEnd={item?.event?.dateEnd}
          dragRef={item?.ref}
        >
          {item?.event?.id}
        </LSchedulerWeekHoverItem>
      )}
      {/*)}*/}
      {/*{isOver && <div>{item?.event?.id}</div>}*/}
    </LSchedulerWeekDropZone>
  );
};

export default CCSchedulerWeekDropZone;
