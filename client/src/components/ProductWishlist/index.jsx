import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toggleProductInWishlistActionCreator } from '../../redux/slices/wishlistSlice/toggleProductInWishlist';
import isProductInWishlist from '../../redux/slices/wishlistSlice/isProductInWishlist';
import { selectWishlist } from '../../redux/selectors';

function ProductWishlist({ product }) {
  const { wishlist } = useSelector(selectWishlist);
  console.log('wishlist', wishlist);
  // const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const toggleProductInWishListCallBack = () => {
    dispatch(toggleProductInWishlistActionCreator(product));
  };
  return isProductInWishlist(wishlist, product) ? (
    <FavoriteIcon
      onClick={toggleProductInWishListCallBack}
      sx={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        color: 'red',
        cursor: 'pointer',
      }}
    />
  ) : (
    <FavoriteBorderIcon
      onClick={toggleProductInWishListCallBack}
      sx={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        color: 'red',
        cursor: 'pointer',
      }}
    />
  );
}

ProductWishlist.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  product: PropTypes.object.isRequired,
};
export default ProductWishlist;
