import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-material-ui-carousel';
// import { Paper, Button } from '@mui/material'
// import { Grid, Box } from '@mui/material';
import Home from '@mui/icons-material/Home';
import ProductCard from '../ProductCard';
import { fetchProducts } from '../../redux/slices/productsSlice';

function PromoCarousel(props) {
  const products = useSelector((state) => state.products.products);
  // const storeProducts = useSelector((state) => state.products.products);
  // const [loadedProducts, setLoadedProducts] = useState([]);
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
        <Carousel navButtonsAlwaysVisible={true} autoPlay={false}>
          {products
            .filter((el) => el.sale === true)
            .map((product) => (
              <ProductCard product={product} />
            ))}
        </Carousel>
      )}
    </div>
  );
}
export default PromoCarousel;
// .filter((el) => el.sale === true)

// import React, { useRef, useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Navigation } from 'swiper';
// import { useSelector, useDispatch } from 'react-redux';
// // import { connect } from 'react-redux';
// import { Grid, Box } from '@mui/material';
// import ProductCard from '../ProductCard';
// import { fetchProducts } from '../../redux/slices/productsSlice';
// // Import Swiper styles
// import 'swiper/scss';
// import 'swiper/scss/navigation';
// import 'swiper/scss/pagination';
// import './styles.css';

// function Carousel() {
//   const products = useSelector((state) => state.products.products);
//   const isFetching = useSelector((state) => state.products.isFetching);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(fetchProducts({}));
//   }, [dispatch]);
//   return (
//     <div>
//       {isFetching ? (
//         <div>Loading...</div>
//       ) : (
//         <Swiper
//           slidesPerView={3}
//           spaceBetween={30}
//           loop={true}
//           pagination={{
//             clickable: true,
//           }}
//           navigation={true}
//           modules={[Pagination, Navigation]}
//           className="mySwiper">
//           {products
//             .filter((el) => el.sale === true)
//             .map((product) => (
//               <SwiperSlide>
//                 <ProductCard product={product} />
//               </SwiperSlide>
//             ))}
//         </Swiper>
//       )}
//     </div>
//   );
// }
// // const mapStateToProps = (state) => ({
// //   products: state.products.products,
// // });

// export default Carousel;
