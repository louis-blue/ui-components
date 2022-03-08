import {
  CCSchedulerWeekViewEventProps,
  DragObject,
  DropTarget
} from "../../../../../../types";
import styled from "@emotion/styled";
import { DateObject } from "../../../../../../../../Utils";
import React, { MutableRefObject, useEffect, useRef } from "react";
import { padStart } from "lodash";
import { DragSourceMonitor, useDrag, useDragDropManager } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

const LSchedulerWeekOverlayEvent = styled(`div`, {
  label: "LSchedulerWeekOverlayEvent"
})<{
  dateBegin: Date;
  dateEnd: Date;
  maxFriendsCount: number;
  step: number;
  isDragging: boolean;
}>(props => {
  const { dateBegin, dateEnd, maxFriendsCount, step, isDragging } = props;
  const _dateBegin = `time-${new DateObject(dateBegin).format("HH")}${padStart(
    String(Math.floor(new DateObject(dateBegin).minute / step) * step),
    2,
    "0"
  )}`;
  const _dateEnd = `time-${new DateObject(dateEnd).format("HH")}${padStart(
    String(Math.floor(new DateObject(dateEnd).minute / step) * step),
    2,
    "0"
  )}`;
  return {
    gridRow: `${_dateBegin} / ${_dateEnd}`,
    backgroundColor: "#fff",
    border: "1px solid #000",
    boxSizing: "border-box",
    gridColumnStart: `span ${Math.floor(1000 / maxFriendsCount)}`,
    pointerEvents: isDragging ? "none" : "auto",
    opacity: isDragging ? 0.5 : 1
  };
});

const CCSchedulerWeekViewEvent: React.FC<
  CCSchedulerWeekViewEventProps
> = props => {
  const {
    dateBegin,
    dateEnd,
    maxFriendsCount,
    step,
    id,
    event,
    onClickEvent
  }: CCSchedulerWeekViewEventProps = props;
  const dragNodeRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [{ isDragging, handlerId, canDrag }, drag, dragPreview] =
    useDrag(() => {
      // console.log(dragNodeRef);
      return {
        id,
        type: DropTarget.Week,
        event,
        item: {
          event: event,
          ref: dragNodeRef
        } as DragObject,
        collect: (monitor: DragSourceMonitor) => {
          return {
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
            canDrag: monitor.canDrag()
          };
        }
      };
    }, [id, dateBegin, dateEnd]);
  const dragDropManager = useDragDropManager();

  const _isDragging = (() => {
    if (handlerId) {
      if (handlerId === dragDropManager.getMonitor().getSourceId()) {
        return isDragging;
      }
      return !canDrag;
    } else {
      return isDragging;
    }
  })();

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: false });
  }, [dragPreview]);

  return (
    <>
      <LSchedulerWeekOverlayEvent
        dateBegin={dateBegin}
        dateEnd={dateEnd}
        maxFriendsCount={maxFriendsCount}
        isDragging={_isDragging}
        step={step}
        id={id}
        ref={ref => {
          dragNodeRef.current = ref;
          drag(ref);
        }}
      >
        {new DateObject(event.dateBegin).format("HHmm")}
      </LSchedulerWeekOverlayEvent>
    </>
  );
};
export default CCSchedulerWeekViewEvent;
