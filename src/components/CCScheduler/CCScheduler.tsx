import React, { useEffect, useState } from "react";
import { CCSchedulerProps, SchedulerView, Step } from "./types";
import { CCSchedulerDayView, CCSchedulerHeader, CCSchedulerWeekView } from "./components";
import styled from "@emotion/styled";
import DateScheduler from "../../Utils/DateScheduler";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PropTypes from "prop-types";

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
    date = new Date(),
    onChangeDate,
    onChangeView,
    view = SchedulerView.Week,
    step = 10,
    contents: contentsProps,
    onChange,
    onClickCell,
    onClickEvent
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
        {view === SchedulerView.Week && (
          <CCSchedulerWeekView
            date={date}
            step={step}
            contents={contents}
            onChange={onChange}
            onClickCell={onClickCell}
            onClickEvent={onClickEvent}
          />
        )}
        {view == SchedulerView.Day && (
          <CCSchedulerDayView
            date={date}
            step={step}
            contents={contents}
            onChange={onChange}
            onClickCell={onClickCell}
            onClickEvent={onClickEvent}
          />
        )}
      </LScheduler>
    </DndProvider>
  );
};

CCScheduler.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChangeDate: PropTypes.func,
  onChangeView: PropTypes.func.isRequired,
  view: PropTypes.oneOf([SchedulerView.Day, SchedulerView.Week, SchedulerView.Agenda]),
  step: PropTypes.oneOf(Step),
  onChange: PropTypes.func.isRequired,
  onClickCell: PropTypes.func.isRequired,
  onClickEvent: PropTypes.func.isRequired,
  contents: PropTypes.array.isRequired
};
CCScheduler.defaultProps = {
  date: new Date(),
  onChangeDate: () => {},
  onChangeView: () => {},
  view: SchedulerView.Week,
  step: 10,
  onChange: () => {},
  onClickCell: () => {},
  onClickEvent: () => {},
  contents: []
};


export default CCScheduler;
