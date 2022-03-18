import {
  CCSchedulerDayViewEventProps,
  DragObject,
  DropTarget
} from "../../../../../../types";
import styled from "@emotion/styled";
import { DateObject } from "../../../../../../../../Utils";
import React, { MutableRefObject, useEffect, useRef } from "react";
import { padStart } from "lodash";
import { DragSourceMonitor, useDrag, useDragDropManager } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

const LSchedulerDayOverlayEvent = styled(`div`, {
  label: "LSchedulerDayOverlayEvent"
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
    position: "relative",
    opacity: isDragging ? 0.5 : 1,
    transform: "translate3d(0px,0px,0px)",
    "&:active": {
      background: "blue"
    }
  };
});

const LSchedulerDayOverlayEventDragHandle = styled(`div`, {
  label: "LSchedulerDayOverlayEventDragHandle"
})<{ isDragging: boolean }>(props => {
  const { isDragging } = props;
  return {
    width: 20,
    height: 10,
    background: "red",
    position: "absolute",
    bottom: 5,
    left: "50%",
    cursor: "row-resize",
    pointerEvents: isDragging ? "none" : "auto" // TODO : Cant move This
    // pointerEvents: "auto"
  };
});

const CCSchedulerDayViewEvent: React.FC<
  CCSchedulerDayViewEventProps
> = props => {
  const {
    dateBegin,
    dateEnd,
    maxFriendsCount,
    step,
    id,
    event,
    onClickEvent
  }: CCSchedulerDayViewEventProps = props;
  const dragNodeRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [{ canDrag, handlerId, isDragging }, drag, dragPreview] =
    useDrag(() => {
      // console.log(dragNodeRef);
      return {
        id,
        type: DropTarget.Day,
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

  const [handleDragProps, handleDrag, handleDragPreview] = useDrag(() => {
    // console.log(dragNodeRef);
    return {
      id,
      type: `${DropTarget.DragHandle}-${new DateObject(dateBegin).format(
        "MMDD"
      )}`,
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

  const _isHandleDragging = (() => {
    if (handleDragProps?.handlerId) {
      if (
        handleDragProps.handlerId === dragDropManager.getMonitor().getSourceId()
      ) {
        return handleDragProps.isDragging;
      }
      return !handleDragProps.canDrag;
    } else {
      return handleDragProps.isDragging;
    }
  })();
  // console.log("_isHandleDragging", _isHandleDragging);

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
      <LSchedulerDayOverlayEvent
        dateBegin={dateBegin}
        dateEnd={dateEnd}
        maxFriendsCount={maxFriendsCount}
        isDragging={_isDragging}
        step={step}
        id={id}
        onClick={e => {
          onClickEvent?.(event);
        }}
        ref={ref => {
          dragNodeRef.current = ref;
          drag(ref);
        }}
      >
        {new DateObject(event.dateBegin).format("HHmm")}
        <LSchedulerDayOverlayEventDragHandle
          onMouseEnter={() => {
            if (dragNodeRef?.current) {
              dragNodeRef.current.style.pointerEvents = "none";
            }
          }}
          onMouseLeave={() => {
            if (dragNodeRef?.current) {
              dragNodeRef.current.style.pointerEvents = "";
            }
          }}
          isDragging={_isHandleDragging}
          ref={handleDrag}
        />
      </LSchedulerDayOverlayEvent>
    </>
  );
};
export default CCSchedulerDayViewEvent;
