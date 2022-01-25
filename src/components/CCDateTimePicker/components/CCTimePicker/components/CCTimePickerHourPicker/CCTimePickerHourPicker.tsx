import { CCTimePickerProps } from "../../../../types";
import React, { MutableRefObject, useLayoutEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import DateObject from "../../../../Utils";
import styled from "@emotion/styled";
import { debounce, throttle } from "lodash";
import normalizeWheel from "normalize-wheel";

const LHourContainer = styled(`div`)`
  display: flex;
  width: 300px;
  position: relative;
  align-items: center;
`;

const LMaskItem = styled(`div`)`
  position: absolute;
  width: 100px;
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
  width: 100px;

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
        new DateObject(null).setHour(0).format("H")
      ) + n;
}

const InputMenuHourItems = function (
  count: number,
  value: Date,
  disableMeridiem: boolean = true
): Array<React.ReactElement> {
  const loop: Array<number> = Array(count).fill(0);
  return loop.map((item, index) => {
    if (disableMeridiem) {
      return (
        <div key={"MenuHourItem" + index}>
          {pad(new DateObject(null).setHour(index).hour, 2)}
        </div>
      );
    } else {
      if (index > 12) {
        return (
          <div key={"MenuHourItem" + index}>
            {pad(new DateObject(null).setHour(index - 12).format("H"), 2)}
          </div>
        );
      } else {
        return (
          <div key={"MenuHourItem" + index}>
            {pad(
              new DateObject(null).setHour(index).hour % 12 === 0
                ? new DateObject(null).setHour(12).format("H")
                : new DateObject(null).setHour(index).format("H"),
              2
            )}
          </div>
        );
      }
    }
  });
};

const CCTimePickerHourPicker: React.FC<CCTimePickerProps> = (
  props: CCTimePickerProps
) => {
  const { value, disabledMeridiem, onChange }: CCTimePickerProps = props;
  const slider: MutableRefObject<any> = useRef();
  const innerSlider: MutableRefObject<any> = useRef();
  useLayoutEffect(() => {
    window.addEventListener(
      "mousewheel",
      throttle((e: any) => {
        const normalized = normalizeWheel(e);
        if (e.target.closest(".slider1") && normalized?.pixelY) {
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
    console.log(slider.current);
    if (slider.current) {
      if (
        slider?.current?.innerSlider?.state?.currentSlide !==
        new DateObject(value).hour
      ) {
        slider.current?.slickGoTo(new DateObject(value).hour);
      }
    }
  }, [value]);

  return (
    <LHourContainer>
      <LSlider
        ref={ref => (slider.current = ref)}
        centerMode={true}
        infinite={true}
        slidesToShow={1}
        speed={80}
        slidesToScroll={10}
        vertical={true}
        verticalSwiping={true}
        swipeToSlide={true}
        arrows={false}
        adaptiveHeight={false}
        afterChange={debounce(e => {
          onChange &&
            onChange(new DateObject(value as Date).setHour(e).toDate());
        }, 240)}
        className={"slider1"}
      >
        {InputMenuHourItems(24, value, disabledMeridiem)}
      </LSlider>
      <LMaskItem>
        <span>hours</span>
      </LMaskItem>
    </LHourContainer>
  );
};
export default CCTimePickerHourPicker;
