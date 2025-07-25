import React, { useEffect, useState } from 'react';
import mainSlider from "../../assets/images/slider-image-3.jpeg";
import mainSlider1 from "../../assets/images/grocery-banner-2.jpeg";
import mainSlider2 from "../../assets/images/grocery-banner.png";
import slider1 from "../../assets/images/slider-image-1.jpeg";
import slider2 from "../../assets/images/slider-image-2.jpeg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainSlider() {
  const [counter, setCounter] = useState(0);

  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-2 md:px-10 mt-12">
      {/* Main Slider */}
      <div className="md:col-span-3">
        <Slider {...settings}>
          <img src={mainSlider} className="w-full h-[250px] md:h-[400px] object-cover rounded-lg" />
          <img src={mainSlider1} className="w-full h-[250px] md:h-[400px] object-cover rounded-lg" />
          <img src={mainSlider2} className="w-full h-[250px] md:h-[400px] object-cover rounded-lg" />
        </Slider>
      </div>

      {/* Side Images */}
      <div className="flex flex-col gap-4">
        <img src={slider1} className="w-full h-[120px] md:h-[200px] object-cover rounded-lg" />
        <img src={slider2} className="w-full h-[120px] md:h-[200px] object-cover rounded-lg" />
      </div>
    </div>
  );
}
