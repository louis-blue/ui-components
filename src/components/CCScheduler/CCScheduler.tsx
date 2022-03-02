import React, { useEffect, useState } from "react";
import { CCSchedulerProps, SchedulerView } from "./types";
import { CCSchedulerHeader, CCSchedulerWeekView } from "./components";
import styled from "@emotion/styled";
import DateScheduler from "../../Utils/DateScheduler";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const LScheduler = styled(`div`, { label: "LScheduler" })(() => {
  return {
    display: "grid",
    gridTemplateColumns: "1fr",
    width: "100%",
    gridRowGap: 16,
    height: "100%"
  };
});

const CCScheduler: React.FC<CCSchedulerProps> = (props: CCSchedulerProps) => {
  const {
    date,
    onChangeDate,
    onChangeView,
    view = SchedulerView.Week,
    step = 10,
    contents: contentsProps
  } = props;
  const [contents, setContents] = useState(new DateScheduler(contentsProps));
  useEffect(() => {
    setContents(new DateScheduler(contentsProps));
  }, [contentsProps]);

  return (
    <DndProvider backend={HTML5Backend}>
      <LScheduler>
        <CCSchedulerHeader
          date={date}
          view={view}
          onChangeDate={e => onChangeDate?.(e)}
          onChangeView={e => onChangeView?.(e)}
        />

        <CCSchedulerWeekView date={date} step={step} contents={contents} />
      </LScheduler>
    </DndProvider>
  );
};
export default CCScheduler;
