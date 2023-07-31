import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { toggleProductInWishlistActionCreator } from '../../redux/slices/wishlistSlice/toggleProductInWishlist';
import isProductInWishlist from '../../redux/slices/wishlistSlice/isProductInWishlist';

function ProductWishlist({ product }) {
  const wishlist = useSelector(
    ({ wishlist: stateWishlist }) => stateWishlist.wishlist
  );
  const dispatch = useDispatch();
  const toggleProductInWishListCallBack = () => {
    dispatch(toggleProductInWishlistActionCreator(product));
  };
  return isProductInWishlist(wishlist, product) ? (
    <button type="submit" onClick={toggleProductInWishListCallBack}>
      remove from wishlist
    </button>
  ) : (
    <button type="submit" onClick={toggleProductInWishListCallBack}>
      add to wishlist
    </button>
  );
}

ProductWishlist.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  product: PropTypes.object.isRequired,
};
export default ProductWishlist;
