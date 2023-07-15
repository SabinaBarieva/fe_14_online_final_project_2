import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchProducts } from '../../redux/slices/productsSlice';
import ProductCard from '../ProductCard';
// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import './styles.scss';

function Carousel() {
  const products = useSelector((state) => state.products.products);
  const isFetching = useSelector((state) => state.products.isFetching);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);
  return (
    <div>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <Swiper
          breakpoints={{
            440: {
              width: 440,
              slidesPerView: 2,
              navigation: true,
            },
            768: {
              width: 768,
              slidesPerView: 3,
              spaceBetween: 20,
            },
            928: {
              width: 928,
              slidesPerView: 4,
            },
          }}
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="saleCarousel">
          {/* {console.log('prod', products)} */}
          {products
            // .filter((el) => el.sale === true)
            .map((product) => (
              <SwiperSlide>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
}
export default Carousel;
