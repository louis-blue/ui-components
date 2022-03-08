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
    background: "transparent",
    "&:active": {
      background: "red"
    }
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
  const {
    date,
    index,
    step,
    onChange,
    onClickCell
  }: CCSchedulerWeekDropZoneProps = props;
  const [{ isOver, item }, drop] = useDrop(() => ({
    accept: DropTarget.Week,
    drop: (item: DragObject, monitor) => {
      let duration: number =
        Number(new DateObject(item.event.dateEnd).format("X")) -
        Number(new DateObject(item.event.dateBegin).format("X"));

      onChange?.({
        ...item.event,
        dateBegin: new DateObject(date).add("minute", index * step).toDate(),
        dateEnd: new DateObject(date)
          .add("minute", index * step)
          .add("second", duration)
          .toDate()
      });
    },
    collect: monitor => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        item: monitor.getItem() as DragObject
      };
    }
  }));
  return (
    <LSchedulerWeekDropZone
      key={index}
      ref={drop}
      onClick={() => {
        onClickCell?.({
          dateBegin: new DateObject(date).add("minute", index * step).toDate(),
          dateEnd: new DateObject(date)
            .add("minute", index * step)
            .add("minute", step)
            .toDate()
        });
      }}
    >
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
    </LSchedulerWeekDropZone>
  );
};

export default CCSchedulerWeekDropZone;
