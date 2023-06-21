import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {connect} from 'react-redux';
// import Product from '../Product';
import getProducts from '../../api/getProducts';

const Carousel = ({product}) => {
  const { id, name, currentPrice, categories, imageUrls, color, brand } = product;
  // console.log(product)
  return (
    <Swiper spaceBetween={50} slidesPerView={3} onSlideChange={() => console.log('slide change')} onSwiper={(swiper) => console.log(swiper)}>
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  );
};
export default Carousel;
