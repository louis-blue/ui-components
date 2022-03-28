import { CCTimePickerProps } from "../../../../types";
import React, { MutableRefObject, useLayoutEffect, useRef } from "react";
import styled from "@emotion/styled";
import Slider from "react-slick";
import { debounce, throttle } from "lodash";
import normalizeWheel from "normalize-wheel";
import { DateObject } from "../../../../../../Utils";

const width = 80;
const LMinuteContainer = styled(`div`)`
  display: flex;
  width: ${width}px;
  position: relative;
  align-items: center;
`;

const LMaskItem = styled(`div`)`
  position: absolute;
  width: ${width}px;
  height: 60px;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  border-top: 1px solid black !important;
  border-bottom: 1px solid black !important;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  span {
    color: #717171;
    font-size: 12px;
  }
`;

const LSlider = styled(Slider)`
  width: ${width}px;

  .slick-slide {
    height: 60px;
    opacity: 0.1;
    font-size: 30px;
    text-align: center;
    background: transparent;
    outline: none;
    transition: opacity 0.23s;
    display: flex;
    justify-content: center;
    align-items: center;

    &.slick-active {
      opacity: 1;
      background: transparent;
    }
  }
`;

function pad(n: number | string, width: number): string {
  return String(n).length >= width
    ? String(n)
    : new Array(width - String(n).length + 1).join(
        new DateObject().setHour(0).format("H")
      ) + n;
}

const InputMenuMinuteItems = function (
  count: number,
  value: Date,
  step: number
): Array<React.ReactElement> {
  const loop: Array<number> = Array(count / step).fill(0);
  return loop.map((item, index) => {
    return (
      <div key={"MenuMinuteItem" + index}>
        {pad(new DateObject().setMinute(index * step).format("m"), 2)}
      </div>
    );
  });
};

const CCTimePickerMinutePicker: React.FC<
  Omit<CCTimePickerProps, "view">
> = props => {
  const { value, onChange, step = 1 } = props;
  const slider: MutableRefObject<Slider | null> = useRef(null);
  useLayoutEffect(() => {
    window.addEventListener(
      "mousewheel",
      throttle((e: any) => {
        const normalized = normalizeWheel(e);
        if (e.target.closest(".minutes") && normalized?.pixelY) {
          if (slider.current) {
            if (normalized?.pixelY > 0) {
              slider.current?.slickNext();
            } else {
              slider.current?.slickPrev();
            }
          }
        }
      }, 80)
    );
  }, []);

  useLayoutEffect(() => {
    if (slider.current) {
      if (
        (slider?.current as any)?.innerSlider?.state?.currentSlide !==
        Math.round(new DateObject(value).minute / step)
      ) {
        // innerSlider 자체가 JSX로 존재하고 타입이 없음, 해당 컴포넌트를 참조하지 않고는 현재 슬라이드를 알수가 없음
        slider.current?.slickGoTo(
          Math.round(new DateObject(value).minute / step)
        );
      }
    }
  }, [value, step]);

  return (
    <LMinuteContainer>
      <LSlider
        ref={ref => (slider.current = ref)}
        centerMode={true}
        infinite={true}
        slidesToShow={1}
        speed={80}
        slidesToScroll={1}
        vertical={true}
        verticalSwiping={true}
        swipeToSlide={true}
        arrows={false}
        adaptiveHeight={false}
        afterChange={debounce(e => {
          const _time = e * step;
          if (new DateObject(value).minute > _time) {
            onChange &&
              onChange(
                new DateObject(value)
                  .add("minute", _time - new DateObject(value).minute)
                  .toDate()
              );
          } else {
            onChange &&
              onChange(
                new DateObject(value)
                  .subtract("minute", new DateObject(value).minute - _time)
                  .toDate()
              );
          }
        }, 240)}
        className={"minutes"}
      >
        {InputMenuMinuteItems(60, value, step)}
      </LSlider>
      <LMaskItem>
        <span>minutes</span>
      </LMaskItem>
    </LMinuteContainer>
  );
};
export default CCTimePickerMinutePicker;
