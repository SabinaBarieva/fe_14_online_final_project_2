import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {connect} from 'react-redux';
// import Product from '../Product';
// import getProducts from '../../api/getProducts';

const Carousel = ({products}) => {
  // const { id, name, currentPrice, categories, imageUrls, color, brand } = products;
  // console.log(product)
  
  return (
    <> 
    <h2 className="title-products">Featured Products</h2>
    <Swiper spaceBetween={50} slidesPerView={3} onSlideChange={() => console.log('slide change')} onSwiper={(swiper) => console.log(swiper)}>
      {products.map((product)=> (
          <SwiperSlide
          key={product.id}
          product={product}
          >
          
          </SwiperSlide>
      ))}
    </Swiper>
    </>
   
  );
};
const mapStateToProps = (state) => ({
  products: state.products.products,
});

export default connect(mapStateToProps, null)(Carousel);
