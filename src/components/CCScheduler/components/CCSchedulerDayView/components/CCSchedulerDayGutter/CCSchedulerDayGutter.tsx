import styled from "@emotion/styled";
import React, { useMemo } from "react";
import { CCSchedulerDayGutterProps } from "../../../../types";
import { DateObject } from "../../../../../../Utils";

const LSchedulerDayGutter = styled(`div`, { label: "LSchedulerDayGutter" })(
  () => {
    return {
      display: "grid",
      gridTemplateColumns: "minmax(100px, auto)",
      gridTemplateRows: "minmax(50px, auto)",
      gridAutoRows: "minmax(20px, auto)",
      width: "100%",
      position: "sticky",
      left: 0,
      backgroundColor: "#fff",
      zIndex: 3
    };
  }
);
const LSchedulerDayGutterHeader = styled(`div`, {
  label: "LSchedulerDayGutterHeader"
})(() => {
  return {
    borderRight: "1px solid #000",
    borderBottom: "1px solid #000",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    position: "sticky",
    top: 0,
    left: 0,
    backgroundColor: "#fff"
  };
});

const LSchedulerDayGutterItem = styled(`div`, {
  label: "LSchedulerDayGutterItem"
})<{ borderBottom: boolean }>(({ borderBottom }) => {
  let _borderBottom = borderBottom ? { borderBottom: "1px solid #000" } : {};
  return {
    borderRight: "1px solid #000",
    width: "100%",
    height: "100%",
    textAlign: "right",
    boxSizing: "border-box",
    ..._borderBottom
  };
});

const CCSchedulerDayGutter: React.FC<CCSchedulerDayGutterProps> = props => {
  const { step }: CCSchedulerDayGutterProps = props;
  const range: Array<number> = useMemo(() => {
    let _arr: Array<number> = new Array((24 * 60) / step).fill(0);
    return _arr;
  }, [step]);
  return (
    <LSchedulerDayGutter>
      <LSchedulerDayGutterHeader />
      {range.map((el, index) => {
        return (
          <LSchedulerDayGutterItem
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
          </LSchedulerDayGutterItem>
        );
      })}
    </LSchedulerDayGutter>
  );
};

export default CCSchedulerDayGutter;
