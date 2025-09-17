"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductSlider({ images }: { images: string[] }) {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,

    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul style={{ margin: 0, padding: 0, display: "flex", gap: "6px" }}>
          {dots}
        </ul>
      </div>
    ),
    customPaging: () => (
      <div
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "#B7BDC6FF",
        }}
      />
    ),
  };

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-[400px]"> 
            <Image
              src={image}
              alt={`product-${index}`}
              fill
              className="object-cover rounded-xl"
              priority={index === 0} 
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
