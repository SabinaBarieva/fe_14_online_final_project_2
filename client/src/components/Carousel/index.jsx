/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AdvancedImage } from '@cloudinary/react';
import { getAllSaleProducts } from '../../redux/slices/allProdsSlice';
import getImg from '../../cloudinary';
import {
  allProductsInBase,
  allProductsIsFetching,
} from '../../redux/selectors';
import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import './styles.scss';
import LoadingAnimation from '../Loading';

function Carousel() {
  const products = useSelector(allProductsInBase);
  const isFetching = useSelector(allProductsIsFetching);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSaleProducts());
  }, [dispatch]);
  return (
    <div>
      {isFetching ? (
        <LoadingAnimation />
      ) : (
        <Swiper
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          loop
          pagination={{
            clickable: true,
          }}
          navigation
          modules={[Pagination, Navigation, Autoplay]}
          className="saleCarousel">
          {products.map((product) => (
            <SwiperSlide key={product.itemNo}>
              <Link
                to={`/product/${product.itemNo}`}
                style={{ marginRight: '7%' }}>
                <AdvancedImage
                  className="main-photo"
                  width="100%"
                  cldImg={getImg.image(product.saleImg)}
                  alt="our-photo"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
export default Carousel;
