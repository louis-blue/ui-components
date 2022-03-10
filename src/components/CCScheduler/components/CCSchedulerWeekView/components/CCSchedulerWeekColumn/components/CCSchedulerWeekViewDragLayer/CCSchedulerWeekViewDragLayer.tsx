import React, { useRef } from "react";
import styled from "@emotion/styled";
import { useDragLayer, XYCoord } from "react-dnd";

function snapToGrid(x: number, y: number): [number, number] {
  const snappedX = Math.round(x / 32) * 32;
  const snappedY = Math.round(y / 32) * 32;
  return [snappedX, snappedY];
}

const LSchedulerWeekViewDragLayer = styled(`div`, {
  label: "LSchedulerWeekViewDragLayer"
})(props => {
  return {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "red",
    pointerEvents: "none",
    opacity: 0.2,
    zIndex: 5
  };
});

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
  delta: XYCoord | null
) {
  if (!initialOffset || !currentOffset || !delta) {
    return {
      display: "none"
    };
  }

  let { x, y } = currentOffset;
  // console.log(initialOffset, currentOffset);

  // if (isSnapToGrid) {
  //   x -= initialOffset.x;
  //   y -= initialOffset.y;
  //   [x, y] = snapToGrid(x, y);
  //   x += initialOffset.x;
  //   y += initialOffset.y;
  // }
  // const transform = `translate(${x}px, ${y}px)`;
  const transform = `translate(${delta.x}px, ${delta.y}px)`;
  return {
    // transform,
    // WebkitTransform: transform,
    top: initialOffset.x,
    left: initialOffset.y,
    position: "absolute",
    background: "yellow"
  };
}

const LSchedulerWeekViewDragOverviewItem = styled(`div`, {
  label: "LSchedulerWeekViewDragOverviewItem"
})<{ initialOffset: XYCoord | null; delta: XYCoord | null }>(
  ({ initialOffset, delta }) => {
    let _top = initialOffset?.y || 0;
    let _left = initialOffset?.x || 0;
    // console.log(delta);
    if (delta?.y) {
      _top = _top + delta.y;
    }
    if (delta?.x) {
      _left = _left + delta.x;
    }
    return {
      position: "absolute",
      top: _top,
      left: _left,
      background: "blue",
      width: 30,
      height: 30
    };
  }
);

const CCSchedulerWeekViewDragLayer: React.FC = props => {
  const dragLayer: React.MutableRefObject<HTMLElement | null> = useRef(null);
  const {
    itemType,
    delta,
    isDragging,
    item,
    initialOffset,
    currentOffset,
    monitor
  } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    delta: monitor.getDifferenceFromInitialOffset(),
    isDragging: monitor.isDragging(),
    monitor
  }));
  // console.log(monitor.getDifferenceFromInitialOffset());
  // console.log("item", item?.node?.offset?.y);
  // console.log("monitor", monitor.getClientOffset());
  // console.log("item", item, getItemStyles(initialOffset, currentOffset, true));
  // if (!isDragging) {
  //   return null;
  // }
  // console.log("dragLayer.current", dragLayer.current?.clientTop);
  return (
    <LSchedulerWeekViewDragLayer
      onMouseOver={e => {
        // console.log("onMouseMove", e);
      }}
      ref={ref => {
        dragLayer.current = ref;
      }}
    >
      <LSchedulerWeekViewDragOverviewItem
        initialOffset={item?.node?.offset}
        delta={delta}
      >
        {item?.id}
      </LSchedulerWeekViewDragOverviewItem>
    </LSchedulerWeekViewDragLayer>
  );
};
export default CCSchedulerWeekViewDragLayer;
