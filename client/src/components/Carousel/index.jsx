/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../../redux/slices/allProdsSlice';
import ProductCard from '../ProductCard';
// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import './styles.scss';

function Carousel() {
  const products = useSelector((state) => state.allProducts.allProds);
  const isFetching = useSelector((state) => state.allProducts.isFetching);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts({}));
  }, [dispatch]);
  return (
    <div>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          // autoplay={{ delay: 2000 }}
          loop
          pagination={{
            clickable: true,
          }}
          navigation
          modules={[Pagination, Navigation]}
          className="saleCarousel"
          breakpoints={{
            440: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            980: {
              slidesPerView: 4,
            },
          }}>
          {products
            .filter((el) => el.sale === true)
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
