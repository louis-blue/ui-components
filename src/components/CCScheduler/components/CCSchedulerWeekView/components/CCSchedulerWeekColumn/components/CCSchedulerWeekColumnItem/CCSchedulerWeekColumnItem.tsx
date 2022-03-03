import { CCSchedulerWeekColumnItemProps } from "../../../../../../types";
import React from "react";
import { DateObject } from "../../../../../../../../Utils";
import styled from "@emotion/styled";

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

const CCSchedulerWeekColumnItem: React.FC<
  CCSchedulerWeekColumnItemProps
> = props => {
  const { index, borderBottom, step }: CCSchedulerWeekColumnItemProps = props;

  return (
    <LSchedulerWeekColumnItem key={index} borderBottom={borderBottom}>
      {Boolean((index * step) % 60 === 0)
        ? new DateObject()
            .startOf("day")
            .add("minutes", index * step)
            .format("LT")
        : ""}
    </LSchedulerWeekColumnItem>
  );
};

export default CCSchedulerWeekColumnItem;
