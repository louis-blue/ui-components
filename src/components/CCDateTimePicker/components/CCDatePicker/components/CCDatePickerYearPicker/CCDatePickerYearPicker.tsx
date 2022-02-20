import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  CALENDAR_VIEW,
  CCDatePickerYearPickerProps,
  CCDateTimePickerWeekValue
} from "../../../../types";
import styled from "@emotion/styled";
import { DateObject } from "../../../../../../Utils";

const LYearPickerContainer = styled("div")<{ open: boolean }>`
  display: ${props => (props.open ? "grid" : "none")};
  grid-template-columns: 30px 1fr 30px;
  background-color: #fff;
  width: inherit;
  height: inherit;
  position: absolute;
  top: 0;
  left: 0;
`;
const LYearPickerYearContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-top: 8px;
  padding-bottom: 8px;
`;
const LYearPickerChevron = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #e3e3e3;
    color: #fff;
  }
`;
const LYearPickerItemContainer = styled("div")<{ isCurrent: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${props => (props?.isCurrent ? "#00897b" : "transparent")};
  color: ${props => (props?.isCurrent ? "#fff" : "inherit")};

  &:hover {
    background-color: #0277bd;
    color: #fff;
  }
`;
const LYearPickerItem = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CCDatePickerYearPicker: React.FC<CCDatePickerYearPickerProps> = (
  props: CCDatePickerYearPickerProps
) => {
  const { value, open, view, onChange }: CCDatePickerYearPickerProps = props;
  const [page, setPage] = useState(0);
  const yearList: Array<number> = useMemo(() => {
    let _res: Array<number> = [];
    let _year = new DateObject(
      view === CALENDAR_VIEW.WEEK
        ? ((value as CCDateTimePickerWeekValue).begin as Date)
        : (value as Date)
    ).year;
    let _normalizeYear = new DateObject(
      view === CALENDAR_VIEW.WEEK
        ? ((value as CCDateTimePickerWeekValue).begin as Date)
        : (value as Date)
    ).setYear(_year - (_year % 10));
    for (let i = 0; i < 10; i++) {
      _res.push(_normalizeYear.add("year", i + page).year);
    }
    for (let i = 1; i <= 10; i++) {
      _res.push(_normalizeYear.subtract("year", i - page).year);
    }
    _res.sort();
    return _res;
  }, [value, page]);
  const isCurrent = useCallback(
    year => {
      return (
        new DateObject(
          view === CALENDAR_VIEW.DAY
            ? (value as Date)
            : ((value as CCDateTimePickerWeekValue).begin as Date)
        ).year === year
      );
    },
    [view, value]
  );

  useEffect(() => {
    if (open) {
      setPage(0);
    }
  }, [open]);

  return (
    <LYearPickerContainer open={open}>
      <LYearPickerChevron
        onClick={e => {
          setPage(prevState => {
            return prevState - 20;
          });
        }}
      >
        {"<"}
      </LYearPickerChevron>
      <LYearPickerYearContainer>
        {yearList.map(year => {
          return (
            <LYearPickerItemContainer
              key={year}
              isCurrent={isCurrent(year)}
              onClick={() => {
                if (view === CALENDAR_VIEW.DAY) {
                  onChange &&
                    onChange(
                      new DateObject(value as Date)
                        .setYear(Number(year))
                        .toDate() as Date
                    );
                }
                if (view === CALENDAR_VIEW.WEEK) {
                  onChange &&
                    onChange({
                      begin: new DateObject(
                        (value as CCDateTimePickerWeekValue).begin as Date
                      )
                        .setYear(Number(year))
                        .startOf("week")
                        .toDate() as Date,
                      end: new DateObject(
                        (value as CCDateTimePickerWeekValue).begin as Date
                      )
                        .setYear(Number(year))
                        .endOf("week")
                        .toDate() as Date
                    });
                }
              }}
            >
              <LYearPickerItem>
                {new DateObject().setYear(year).format("YYYY")}
              </LYearPickerItem>
            </LYearPickerItemContainer>
          );
        })}
      </LYearPickerYearContainer>
      <LYearPickerChevron
        onClick={e => {
          setPage(prevState => {
            return prevState + 20;
          });
        }}
      >
        {">"}
      </LYearPickerChevron>
    </LYearPickerContainer>
  );
};

export default CCDatePickerYearPicker;
