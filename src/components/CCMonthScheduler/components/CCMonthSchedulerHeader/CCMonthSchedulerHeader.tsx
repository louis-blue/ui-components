import React from "react";
import styled from "@emotion/styled";
import { CCMonthSchedulerHeaderProps, SchedulerView } from "../../types";
import { DateObject } from "../../../../Utils";

const LMonthSchedulerHeader = styled("div", {
  label: "LMonthSchedulerHeader"
})(({ theme }) => {
  return {
    display: "grid",
    gridTemplateColumns: "200px 1fr",
    width: "inherit"
  };
});

const LMonthSchedulerHeaderMode = styled("div", {
  label: "LMonthSchedulerHeader"
})(({ theme }) => {
  return {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    border: "1px solid #000",
    gridColumnGap: 8,
    padding: 8,
    borderRadius: 8
  };
});
const LMonthSchedulerHeaderDate = styled("div", {
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
const LMonthPickerChevron = styled("div", {
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
const LMonthPickerDate = styled("div", {
  label: "LMonthPickerDate"
})(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
});

const CCMonthSchedulerHeader: React.FC<CCMonthSchedulerHeaderProps> = (
  props: CCMonthSchedulerHeaderProps
) => {
  const { date, onChange, view, onChangeView }: CCMonthSchedulerHeaderProps =
    props;
  return (
    <LMonthSchedulerHeader>
      <LMonthSchedulerHeaderMode>
        <button
          onClick={() => {
            onChangeView(SchedulerView.Month);
          }}
        >
          {"Month"}
        </button>
        <button
          onClick={() => {
            onChangeView(SchedulerView.Agenda);
          }}
        >
          {"Agenda"}
        </button>
      </LMonthSchedulerHeaderMode>
      <LMonthSchedulerHeaderDate>
        <LMonthPickerChevron
          onClick={() => {
            onChange?.(new DateObject(date).subtract("month", 1).toDate());
          }}
        >
          {"<"}
        </LMonthPickerChevron>
        <LMonthPickerDate>
          {new DateObject(date).format("LMM")}
        </LMonthPickerDate>
        <LMonthPickerChevron
          onClick={e => {
            onChange?.(new DateObject(date).add("month", 1).toDate());
          }}
        >
          {">"}
        </LMonthPickerChevron>
      </LMonthSchedulerHeaderDate>
    </LMonthSchedulerHeader>
  );
};
export default CCMonthSchedulerHeader;
