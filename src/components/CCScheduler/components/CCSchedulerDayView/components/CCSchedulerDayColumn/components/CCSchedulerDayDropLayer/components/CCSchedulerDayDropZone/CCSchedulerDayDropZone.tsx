import React from "react";
import styled from "@emotion/styled";
import {
  CCSchedulerDayDropZoneProps,
  DragObject,
  DropTarget,
  TimeStep
} from "../../../../../../../../types";
import { useDrop } from "react-dnd";
import { DateObject } from "../../../../../../../../../../Utils";

const LSchedulerDayDropZone = styled(`div`, {
  label: "LSchedulerDayDropZone"
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
    // borderBottom: "1px solid black"
  };
});

const LSchedulerDayHoverItem = styled(`div`, {
  label: "LSchedulerDayHoverItem"
})<{
  dateBegin?: Date;
  dateEnd?: Date;
  step: TimeStep;
  type: DropTarget;
  currentDate?: Date;
  index: number;
}>(({ theme, step, dateBegin, dateEnd, currentDate, type, index }) => {
  let _dateBegin;
  let _dateEnd;
  let _diff;
  switch (type) {
    default:
    case DropTarget.Day:
      _dateBegin = new DateObject(dateBegin);
      _dateEnd = new DateObject(dateEnd);
      _diff = _dateEnd.diff(_dateBegin, "minutes");
      console.log("type", type);
      return {
        border: "1px solid #000",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: (_diff / step) * 20,
        pointerEvents: "none",
        background: "white",
        zIndex: 3
      };
    case `${DropTarget.DragHandle}-${new DateObject(currentDate).format(
      "MMDD"
    )}`:
      _dateBegin = new DateObject(dateBegin);
      _dateEnd = new DateObject(currentDate).add("minute", (index + 1) * step);
      if (Number(_dateBegin.format("X")) === Number(_dateEnd.format("X"))) {
        _dateEnd = new DateObject(currentDate).add("minute", index * step);
      }

      if (Number(_dateBegin.format("X")) > Number(_dateEnd.format("X"))) {
        _dateEnd = new DateObject(currentDate).add("minute", index * step);
        [_dateBegin, _dateEnd] = [_dateEnd, _dateBegin];
        _diff = _dateEnd.diff(_dateBegin, "minutes");
        return {
          border: "1px solid #000",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: (_diff / step) * 20,
          pointerEvents: "none",
          background: "white",
          zIndex: 3
        };
      } else {
        _diff = _dateEnd.diff(_dateBegin, "minutes");
        return {
          border: "1px solid #000",
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: (_diff / step) * 20,
          pointerEvents: "none",
          background: "white",
          zIndex: 3
        };
      }
  }
});

const CCSchedulerDayDropZone: React.FC<CCSchedulerDayDropZoneProps> = props => {
  const {
    date,
    index,
    step,
    onChange,
    onClickCell
  }: CCSchedulerDayDropZoneProps = props;
  const [dropProps, drop] = useDrop(() => ({
    accept: [
      DropTarget.Day,
      `${DropTarget.DragHandle}-${new DateObject(date).format("MMDD")}`
    ],
    drop: (item: DragObject, monitor) => {
      switch (monitor.getItemType()) {
        case DropTarget.Day:
          console.log(date, item);
          let duration: number =
            Number(new DateObject(item.event.dateEnd).format("X")) -
            Number(new DateObject(item.event.dateBegin).format("X"));

          onChange?.({
            ...item.event,
            dateBegin: new DateObject(date)
              .add("minute", index * step)
              .toDate(),
            dateEnd: new DateObject(date)
              .add("minute", index * step)
              .add("second", duration)
              .toDate()
          });
          break;
        case `${DropTarget.DragHandle}-${new DateObject(date).format("MMDD")}`:
          let _dateBegin = new DateObject(item.event.dateBegin);
          let _dateEnd = new DateObject(date).add("minute", (index + 1) * step);

          if (Number(_dateBegin.format("X")) === Number(_dateEnd.format("X"))) {
            _dateEnd = new DateObject(date).add("minute", index * step);
          }

          if (Number(_dateBegin.format("X")) > Number(_dateEnd.format("X"))) {
            _dateEnd = new DateObject(date).add("minute", index * step);
            [_dateBegin, _dateEnd] = [_dateEnd, _dateBegin];
          }

          onChange?.({
            ...item.event,
            dateBegin: _dateBegin.toDate(),
            dateEnd: _dateEnd.toDate()
          });
          break;
        default:
          break;
      }
    },
    collect: monitor => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        item: monitor.getItem() as DragObject,
        type: monitor.getItemType() as DropTarget
      };
    }
    // hover: (item, monitor) => {
    //   console.log("hover", item);
    // }
  }));
  return (
    <LSchedulerDayDropZone
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
      {dropProps?.isOver && (
        <LSchedulerDayHoverItem
          step={step}
          dateBegin={dropProps?.item?.event?.dateBegin}
          dateEnd={dropProps?.item?.event?.dateEnd}
          currentDate={date}
          type={dropProps?.type}
          index={index}
        >
          {dropProps?.item?.event?.id}
        </LSchedulerDayHoverItem>
      )}
    </LSchedulerDayDropZone>
  );
};

export default CCSchedulerDayDropZone;
