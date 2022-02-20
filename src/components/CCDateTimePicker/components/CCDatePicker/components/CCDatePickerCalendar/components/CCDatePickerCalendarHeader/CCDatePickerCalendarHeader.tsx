import styled from "@emotion/styled";
import React from "react";
import { DateObject } from "../../../../../../../../Utils";

const DateItemSize = 36;

const LDatePickerWeekHeaderItem = styled("div", {
  label: "LDatePickerWeekHeaderItem"
})(({ theme }) => {
  return {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    height: DateItemSize
  };
});

const LDatePickerWeekHeaderItemContainer = styled("div", {
  label: "LDatePickerWeekHeaderItemContainer"
})(({ theme }) => {
  return {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)"
  };
});

const CCDatePickerCalendarHeader: React.FC = () => {
  const startOfWeek = new DateObject(null).startOf("week");
  const weekArray = Array(7).fill(1);
  return (
    <LDatePickerWeekHeaderItemContainer>
      {weekArray.map((item, index) => {
        return (
          <LDatePickerWeekHeaderItem
            key={"CCDatePickerCalendarWeekHeaderItem" + index}
          >
            {startOfWeek.add("day", index).format("dd").toUpperCase()}
          </LDatePickerWeekHeaderItem>
        );
      })}
    </LDatePickerWeekHeaderItemContainer>
  );
};

export default CCDatePickerCalendarHeader;
