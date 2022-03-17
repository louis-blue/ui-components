import React from "react";
import { DateObject } from "../../../../../../../../Utils";
import styled from "@emotion/styled";
import { CCSchedulerDayColumnItemProps } from "../../../../../../types";

const LSchedulerDayColumnItem = styled(`div`, {
  label: "LSchedulerDayColumnItem"
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

const CCSchedulerDayColumnItem: React.FC<
  CCSchedulerDayColumnItemProps
> = props => {
  const { index, borderBottom, step }: CCSchedulerDayColumnItemProps = props;

  return (
    <LSchedulerDayColumnItem key={index} borderBottom={borderBottom}>
      {Boolean((index * step) % 60 === 0)
        ? new DateObject()
            .startOf("day")
            .add("minutes", index * step)
            .format("LT")
        : ""}
    </LSchedulerDayColumnItem>
  );
};

export default CCSchedulerDayColumnItem;
