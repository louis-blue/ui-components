import React, { useMemo } from "react";
import { CCSchedulerWeekColumnProps } from "../../../../types";
import { DateObject } from "../../../../../../Utils";
import styled from "@emotion/styled";

const LSchedulerWeekColumn = styled(`div`, { label: "LSchedulerWeekColumn" })(
  () => {
    return {
      display: "grid",
      gridTemplateColumns: "minmax(100px, auto)",
      gridTemplateRows: "minmax(50px, auto)",
      gridAutoRows: "minmax(20px, auto)",
      width: "100%"
    };
  }
);

const LSchedulerWeekColumnHeader = styled(`div`, {
  label: "LSchedulerWeekGutterHeader"
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
    alignItems: "center"
  };
});

const CCSchedulerWeekColumn: React.FC<CCSchedulerWeekColumnProps> = props => {
  const { step, date }: CCSchedulerWeekColumnProps = props;
  const range: Array<number> = useMemo(() => {
    let _arr: Array<number> = new Array((24 * 60) / step).fill(0);
    return _arr;
  }, [step]);
  return (
    <LSchedulerWeekColumn>
      <LSchedulerWeekColumnHeader>
        {new DateObject(date).format("dddd")}
      </LSchedulerWeekColumnHeader>
      {range.map((el, index) => {
        return (
          <div
            key={index}
            // borderBottom={Boolean(
            //     index !== 0 &&
            //     index !== range.length - 1 &&
            //     ((index + 1) * step) % 60 === 0
            // )}
          >
            {Boolean((index * step) % 60 === 0)
              ? new DateObject()
                  .startOf("day")
                  .add("minutes", index * step)
                  .format("LT")
              : ""}
          </div>
        );
      })}
    </LSchedulerWeekColumn>
  );
};
export default CCSchedulerWeekColumn;
