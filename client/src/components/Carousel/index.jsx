/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useSelector, useDispatch } from 'react-redux';
import { LinearProgress } from '@mui/material';
import { useTheme } from '@mui/system';
// eslint-disable-next-line import/named
import { getAllProducts } from '../../redux/slices/allSaleProdsSlice';
import ProductCard from '../ProductCard';
import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import './styles.scss';

function Carousel() {
  const theme = useTheme();
  const products = useSelector((state) => state.allProducts.allProds);
  const isFetching = useSelector((state) => state.allProducts.isFetching);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts({}));
  }, [dispatch]);
  return (
    <div>
      {isFetching ? (
        <LinearProgress
          sx={{
            backgroundColor: `${theme.palette.primary.light}`,
            width: '80%',
            mx: 'auto',
          }}
        />
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{ delay: 5000 }}
          loop
          pagination={{
            clickable: true,
          }}
          navigation
          modules={[Pagination, Navigation, Autoplay]}
          className="saleCarousel"
          // key={product.itemNo}
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
