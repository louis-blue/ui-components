import { CCTimePickerProps } from "../../../../types";
import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CCTimePickerHourPicker: React.FC<CCTimePickerProps> = (
  props: CCTimePickerProps
) => {
  const { value }: CCTimePickerProps = props;
  const slider = useRef(null);
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    // adaptiveHeight: true,
    swipeToSlide: true,
    draggable: true,
    beforeChange: function (currentSlide: any, nextSlide: any) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide: any) {
      console.log("after change", currentSlide);
    }
  };

  function scroll(e) {
    if (slider === null) return 0;

    e.wheelDelta > 0 ? slider.current.slickNext() : slider.current.slickPrev();
  }

  useEffect(() => {
    window.addEventListener("wheel", scroll, true);

    return () => {
      window.removeEventListener("wheel", scroll, true);
    };
  }, []);
  return (
    <div>
      <div style={{ height: 200 }}>
        <Slider {...settings} ref={slider}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    </div>
  );
};
export default CCTimePickerHourPicker;
