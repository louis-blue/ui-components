import React, { useMemo } from "react";
import { CCSchedulerWeekColumnProps } from "../../../../types";
import { DateObject } from "../../../../../../Utils";
import styled from "@emotion/styled";
import { DateSchedulerEventSearchResultItem } from "../../../../../../Utils/DateScheduler/types";
import CCSchedulerWeekViewEvent from "./components/CCSchedulerWeekViewEvent";
import { padStart } from "lodash";
import CCSchedulerWeekViewDragLayer from "./components/CCSchedulerWeekViewDragLayer";
import withScrolling from "react-dnd-scrolling";

const LSchedulerWeekColumn = styled(`div`, { label: "LSchedulerWeekColumn" })(
  () => {
    return {
      display: "grid",
      gridTemplateColumns: "minmax(100px, auto)",
      gridTemplateRows: "minmax(50px, auto) 1fr",
      width: "100%",
      position: "relative"
    };
  }
);

const LSchedulerWeekColumnHeader = styled(`div`, {
  label: "LSchedulerWeekColumnHeader"
})(() => {
  return {
    borderRight: "1px solid #000",
    borderBottom: "1px solid #000",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    backgroundColor: "#fff",
    position: "sticky",
    top: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2
  };
});

const LSchedulerWeekColumnItemGroup = styled(`div`, {
  label: "LSchedulerWeekColumnItemGroup"
})(({}) => {
  return {
    display: "grid",
    position: "relative"
  };
});
const LSchedulerWeekColumnItem = styled(`div`, {
  label: "LSchedulerWeekColumnItem"
})<{ borderBottom: boolean }>(({ borderBottom }) => {
  let _borderBottom = borderBottom ? { borderBottom: "1px solid #000" } : {};
  return {
    borderRight: "1px solid #000",
    width: "100%",
    height: 20,
    textAlign: "right",
    boxSizing: "border-box",
    ..._borderBottom
  };
});

const LSchedulerWeekColumnPositionOverlay = styled(`div`, {
  label: "LSchedulerWeekColumnPositionOverlay"
})<{ range: Array<number>; step: number }>(({ range, step }) => {
  let gridTemplateRows = range
    .map((item, index) => {
      let _rawTime = new DateObject()
        .startOf("day")
        .add("minutes", index * step);
      let _time = `${padStart(_rawTime.hour.toString(), 2, "0")}${padStart(
        _rawTime.minute.toString(),
        2,
        "0"
      )}`;
      return `[time-${_time}] 1fr`;
    })
    .join("\n");

  return {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,255,0.2)",
    display: "grid",
    gridTemplateColumns: "repeat(1000, 1fr)",
    gridTemplateRows: gridTemplateRows
  };
});
const ScrollingComponent = withScrolling("div");
const CCSchedulerWeekColumn: React.FC<CCSchedulerWeekColumnProps> = props => {
  const { step, date, contents }: CCSchedulerWeekColumnProps = props;
  const range: Array<number> = useMemo(() => {
    let _arr: Array<number> = new Array((24 * 60) / step).fill(0);
    return _arr;
  }, [step]);
  const events = useMemo(() => {
    return contents.search({
      dateBegin: new DateObject(date).startOf("day").toDate(),
      dateEnd: new DateObject(date).endOf("day").toDate()
    });
  }, [contents]);

  return (
    <LSchedulerWeekColumn>
      <LSchedulerWeekColumnHeader>
        {new DateObject(date).format("dddd")}
      </LSchedulerWeekColumnHeader>
      <LSchedulerWeekColumnItemGroup>
        {range.map((el, index) => {
          return (
            <LSchedulerWeekColumnItem
              key={index}
              borderBottom={Boolean(
                index !== 0 &&
                  index !== range.length - 1 &&
                  ((index + 1) * step) % 60 === 0
              )}
            >
              {Boolean((index * step) % 60 === 0)
                ? new DateObject()
                    .startOf("day")
                    .add("minutes", index * step)
                    .format("LT")
                : ""}
            </LSchedulerWeekColumnItem>
          );
        })}
        <LSchedulerWeekColumnPositionOverlay range={range} step={step}>
          <CCSchedulerWeekViewDragLayer />
          {events.map((event: DateSchedulerEventSearchResultItem) => {
            return (
              <CCSchedulerWeekViewEvent
                dateBegin={event.event.dateBegin}
                dateEnd={event.event.dateEnd}
                maxFriendsCount={event.maxFriendsCount}
                step={step}
                id={event.event.id}
                event={event.event}
                key={event.event.id}
              />
            );
          })}
        </LSchedulerWeekColumnPositionOverlay>
      </LSchedulerWeekColumnItemGroup>
    </LSchedulerWeekColumn>
  );
};
export default CCSchedulerWeekColumn;
