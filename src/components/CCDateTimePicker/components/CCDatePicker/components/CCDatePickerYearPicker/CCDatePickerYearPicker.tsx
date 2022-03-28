import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  CCDatePickerYearPickerProps,
  isDateTimePickerWeekValue
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

const CCDatePickerYearPicker: React.FC<CCDatePickerYearPickerProps> = props => {
  const { value, open, view, onChange } = props;
  const [page, setPage] = useState(0);
  const yearList: Array<number> = useMemo(() => {
    let _res: Array<number> = [];
    let _year: number;
    let _normalizeYear: DateObject;
    if (value instanceof Date) {
      _year = new DateObject(value).year;
      _normalizeYear = new DateObject(value).setYear(_year - (_year % 10));
      for (let i = 0, j = 1; i < 10 || j <= 0; i++, j++) {
        _res.push(_normalizeYear.add("year", i + page).year);
        _res.push(_normalizeYear.subtract("year", j - page).year);
      }
    }
    if (isDateTimePickerWeekValue(value)) {
      _year = new DateObject(value.begin).year;
      _normalizeYear = new DateObject(value.begin).setYear(
        _year - (_year % 10)
      );
      for (let i = 0, j = 1; i < 10 || j <= 0; i++, j++) {
        _res.push(_normalizeYear.add("year", i + page).year);
        _res.push(_normalizeYear.subtract("year", j - page).year);
      }
    }

    _res.sort();
    return _res;
  }, [value, page]);
  const isCurrent = useCallback(
    year => {
      if (value instanceof Date) {
        return new DateObject(value).year === year;
      }
      if (isDateTimePickerWeekValue(value)) {
        return new DateObject(value.begin).year === year;
      }
      return false;
    },
    [value]
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
                if (value instanceof Date) {
                  onChange &&
                    onChange(
                      new DateObject(value).setYear(Number(year)).toDate()
                    );
                }
                if (isDateTimePickerWeekValue(value)) {
                  onChange &&
                    onChange({
                      begin: new DateObject(value.begin)
                        .setYear(Number(year))
                        .startOf("week")
                        .toDate(),
                      end: new DateObject(value.begin)
                        .setYear(Number(year))
                        .endOf("week")
                        .toDate()
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
