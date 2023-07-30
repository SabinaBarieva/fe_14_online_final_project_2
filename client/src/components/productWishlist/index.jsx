import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toggleProductInWishlist, {
  toggleProductInWishlistActionCreator,
} from '../../redux/slices/wishlistSlice/toggleProductInWishlist';

function productWishlist({ productId }) {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();
  const isProductInWishlist = wishlist.includes(productId);
  const toggleProductInWishListCallBack = () => {
    dispatch(toggleProductInWishlistActionCreator({ productId }));
  };
  return isProductInWishlist ? (
    <button type="submit" onClick={toggleProductInWishListCallBack}>
      remove from wishlist
    </button>
  ) : (
    <button type="submit" onClick={toggleProductInWishListCallBack}>
      add to wishlist
    </button>
  );
}
export default productWishlist;
