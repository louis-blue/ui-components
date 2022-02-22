import { CCSchedulerHeaderProps, SchedulerView } from "../../types";
import React from "react";
import styled from "@emotion/styled";
import { DateObject } from "../../../../Utils";

const LSchedulerHeader = styled("div", {
  label: "LSchedulerHeader"
})(({ theme }) => {
  return {
    display: "grid",
    gridTemplateColumns: "200px 1fr",
    width: "inherit"
  };
});

const LSchedulerHeaderMode = styled("div", {
  label: "LMonthSchedulerHeader"
})(({ theme }) => {
  return {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    border: "1px solid #000",
    gridColumnGap: 8,
    padding: 8,
    borderRadius: 8
  };
});
const LSchedulerHeaderDate = styled("div", {
  label: "LMonthSchedulerHeader"
})(({ theme }) => {
  return {
    display: "grid",
    gridTemplateColumns: "25px 1fr 25px",
    gridColumnGap: 8,
    padding: 8,
    placeSelf: "center center"
  };
});
const LPickerChevron = styled("div", {
  label: "LMonthSchedulerHeader"
})(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",

    "&:hover": {
      backgroundColor: "#e3e3e3",
      color: "#fff"
    }
  };
});
const LPickerDate = styled("div", {
  label: "LPickerDate"
})(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
});

const CCSchedulerHeader: React.FC<CCSchedulerHeaderProps> = (
  props: CCSchedulerHeaderProps
) => {
  const { date, onChangeDate, onChangeView, view }: CCSchedulerHeaderProps =
    props;
  return (
    <LSchedulerHeader>
      <LSchedulerHeaderMode>
        <button
          onClick={() => {
            onChangeView(SchedulerView.Week);
          }}
        >
          {"Week"}
        </button>
        <button
          onClick={() => {
            onChangeView(SchedulerView.Day);
          }}
        >
          {"Day"}
        </button>
        <button
          onClick={() => {
            onChangeView(SchedulerView.Agenda);
          }}
        >
          {"Agenda"}
        </button>
      </LSchedulerHeaderMode>
      <LSchedulerHeaderDate>
        <LPickerChevron
          onClick={() => {
            onChangeDate?.(new DateObject(date).subtract("month", 1).toDate());
          }}
        >
          {"<"}
        </LPickerChevron>
        <LPickerDate>{new DateObject(date).format("LMM")}</LPickerDate>
        <LPickerChevron
          onClick={e => {
            onChangeDate?.(new DateObject(date).add("month", 1).toDate());
          }}
        >
          {">"}
        </LPickerChevron>
      </LSchedulerHeaderDate>
    </LSchedulerHeader>
  );
};
export default CCSchedulerHeader;
