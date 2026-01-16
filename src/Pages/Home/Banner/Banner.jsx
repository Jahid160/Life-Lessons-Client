import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./style.css";

// Swiper modules
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";

import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Component/Loading/Loading";
import useAxios from "../../../Hooks/useAxios";


const Banner = () => {
  const axiosInstance = useAxios();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

const { data, isLoading, isError, error } = useQuery({
  queryKey: ["banner"],
  queryFn: async () => {
    try {
      const res = await axiosInstance.get("/banner");
      const result = res.data;

      // Force it to always be array
      if (Array.isArray(result)) return result;
      if (result && typeof result === 'object') return []; // error object / wrong format
      return []; // null, undefined, etc.
    } catch (err) {
      console.error("Banner fetch failed:", err);
      return []; // very important
    }
  },
});

if (isLoading) return <Loading />;
if (isError) return <div>Error loading banners</div>;

const banners = Array.isArray(data) ? data : [];

  return (
    <Swiper
      style={{
        "--swiper-navigation-color": "#fff",
        "--swiper-pagination-color": "#fff",
      }}
      loop={true}
      spaceBetween={10}
      navigation={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      thumbs={{ swiper: thumbsSwiper }}
      modules={[FreeMode, Navigation, Thumbs, Autoplay]}
      className="mySwiper2"
    >
      {banners.length > 0 ? (
      banners.map((item, i) => (
        <SwiperSlide key={i}>
          <img src={item.image} alt="" />
        </SwiperSlide>
      ))
    ) : (
      <SwiperSlide>
        <div style={{height: '350px', display:'grid', placeContent:'center'}}>
          No banners available
        </div>
      </SwiperSlide>
    )}
    </Swiper>
  );
};

export default Banner;
