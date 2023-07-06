import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { connect } from 'react-redux';
// import Product from '../Product';
// import getProducts from '../../api/getProducts';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper";

const Carousel = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  // const { id, name, currentPrice, categories, imageUrls, color, brand } = products;
  // console.log(product)
  return (
    <> 
    <h2 className='promo-title'>promotional offers</h2>
    <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
      </Swiper>
    {/* <Swiper spaceBetween={50} slidesPerView={3} onSlideChange={() => console.log('slide change')} onSwiper={(swiper) => console.log(swiper)}>
      {products.map((product) => (
          <SwiperSlide
          key={product.name}
          product={product}
          >
          </SwiperSlide>
      ))}
    </Swiper> */}
    </>
  );
};
const mapStateToProps = (state) => ({
  products: state.products.products,
});

export default connect(mapStateToProps, null)(Carousel);
