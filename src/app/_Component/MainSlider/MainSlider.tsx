"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HeroSlider() {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="grid grid-cols-10 my-6">
      {/* Left slider */}
      <div className="col-span-8">
        <Slider {...settings}>
          {[
            "/images/slider-image-1.jpeg",
            "/images/slider-image-2.jpeg",
            "/images/slider-image-3.jpeg",
          ].map((src, i) => (
            <div key={i} className="relative w-full h-[300px]">
              <Image
                src={src}
                alt={`slider-${i + 1}`}
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Right stacked promos */}
      <div className="col-span-2 flex flex-col">
        <div className="relative w-full h-[150px]">
          <Image
            src="/images/pic1.png"
            alt="promo1"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative w-full h-[150px]">
          <Image
            src="/images/pic.png"
            alt="promo2"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
