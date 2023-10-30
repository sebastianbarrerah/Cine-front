import "./slider.css";
import React, { useEffect, useState } from "react";
import { traerPeliculas } from "../../service/traerPeliculas/traerPeliculas.js";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, EffectCoverflow, Autoplay } from "swiper/modules";

function Slider() {

  const URL_IMAGE = 'https://image.tmdb.org/t/p/original';

  const [data, setData] = useState([]);

  useEffect(() => {
    traerData();
  }, []);

  const traerData = async () => {
    const data = await traerPeliculas();
    setData(data);
  };

  return (
    <div className="container">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={5}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: false,
        }}
        autoplay={{
          delay: 3000, // Tiempo de espera entre cada transición en milisegundos (3 segundos en este ejemplo)
          disableOnInteraction: false, // Permite que el autoplay siga funcionando incluso si el usuario interactúa con el carrusel
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]} // Utilizar los nombres correctos aquí
        className="swiper_container"
      >
       {

          data.map((pelicula, index) => (
            <SwiperSlide key={index}>

              <img src={URL_IMAGE + pelicula.poster_path} alt="slide_image" />
              {/* <h1>{pelicula.title}</h1>
              <span>Título en inglés:{pelicula.original_title}</span>
              <span>Esteno:{pelicula.release_date}</span> */}
            </SwiperSlide>
          ))

       }
              <div className="slider-controler">
                <div className="swiper-button-prev slider-arrow">
                  <ion-icon name="arrow-back-outline"></ion-icon>
                </div>
                <div className="swiper-button-next slider-arrow">
                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </div>
                <div className="swiper-pagination"></div>
              </div>

      </Swiper>
    </div>
  );
}

export default Slider;
