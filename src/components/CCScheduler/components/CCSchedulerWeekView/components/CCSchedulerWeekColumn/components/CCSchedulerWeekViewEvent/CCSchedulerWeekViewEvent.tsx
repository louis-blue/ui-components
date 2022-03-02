import { CCSchedulerWeekViewEventProps } from "../../../../../../types";
import styled from "@emotion/styled";
import { DateObject } from "../../../../../../../../Utils";
import React, { useEffect, useRef, useState } from "react";
import { padStart } from "lodash";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

const LSchedulerWeekOverlayEvent = styled(`div`, {
  label: "LSchedulerWeekOverlayEvent"
})<{
  dateBegin: Date;
  dateEnd: Date;
  maxFriendsCount: number;
  step: number;
}>(props => {
  const { dateBegin, dateEnd, maxFriendsCount, step } = props;
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
    gridColumnStart: `span ${Math.floor(1000 / maxFriendsCount)}`
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
    event
  }: CCSchedulerWeekViewEventProps = props;
  const interactable = useRef<any>(null);
  const node: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [{ isDragging }, drag, dragPreview] = useDrag(() => {
    console.log(node);
    return {
      type: "CCSchedulerWeekViewEvent",
      item: {
        id,
        node: {
          offset: {
            x: node.current?.offsetLeft,
            y: node.current?.offsetTop
          }
        }
      },
      collect: (monitor: DragSourceMonitor) => {
        // console.log(monitor);
        return {
          isDragging: monitor.isDragging()
        };
      }
    };
  }, [id, dateBegin, dateEnd, node.current]);
  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, []);
  // useEffect(() => {
  //   if (node.current) {
  //     setPosition({ x: node.current?.offsetLeft, y: node.current?.offsetTop });
  //   }
  // }, [node]);

  // console.log(node);

  return (
    <LSchedulerWeekOverlayEvent
      dateBegin={dateBegin}
      dateEnd={dateEnd}
      maxFriendsCount={maxFriendsCount}
      step={step}
      id={id}
      ref={ref => {
        node.current = ref;
        drag(ref);
      }}
      // ref={drag}
      // isDragging={Boolean(isDragging)}
    >
      {/*{event.event.id}*/}

      {new DateObject(event.dateBegin).format("HHmm")}
    </LSchedulerWeekOverlayEvent>
  );
};
export default CCSchedulerWeekViewEvent;
