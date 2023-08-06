import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { selectWishlist } from '../../redux/selectors';
import { changeWishlistActionCreator } from '../../redux/slices/wishlistSlice/changeWishlist';
import findProductInWishlist from '../../redux/slices/wishlistSlice/findProductInWishlist';

function ProductWishlist({ product }) {
  const wishlist = useSelector(selectWishlist);
  const dispatch = useDispatch();

  const handleProductInWishlist = () => {
    dispatch(changeWishlistActionCreator(product));
  };

  return findProductInWishlist(product, wishlist.itemsWishlist) ? (
    <FavoriteIcon onClick={handleProductInWishlist} />
  ) : (
    <FavoriteBorderIcon onClick={handleProductInWishlist} />
  );
}

ProductWishlist.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  product: PropTypes.object.isRequired,
};
export default ProductWishlist;
