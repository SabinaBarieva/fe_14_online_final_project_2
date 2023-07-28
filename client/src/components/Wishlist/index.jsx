import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { handleWishlist } from '../../redux/slices/wishlistSlice';
import { selectWishlist } from '../../redux/selectors';

function Wishlist() {
  const product = { itemNo: 1 };
  const dispatch = useDispatch();
  const [addedWishlist, setAddedWishlist] = useState(false);
  const { itemsWishlist } = useSelector(selectWishlist);
  console.log('item', itemsWishlist);
  let wishlist = [];

  useEffect(() => {
    if (itemsWishlist.length) {
      if (itemsWishlist.includes(product.itemNo)) {
        setAddedWishlist(true);
      }
    }
  }, [itemsWishlist, product.itemNo]);

  const updateWishlist = (e) => {
    e.preventDefault();
    setAddedWishlist((prev) => !prev);
    if (!addedWishlist) {
      if (itemsWishlist.length) {
        if (!itemsWishlist.includes(product.itemNo)) {
          wishlist = [...itemsWishlist, product.itemNo];
        }
      } else {
        wishlist = [...itemsWishlist, product.itemNo];
      }
    } else if (itemsWishlist.length) {
      wishlist = itemsWishlist.filter((item) => item !== product.itemNo);
    }
    console.log('w', itemsWishlist);
    console.log('wish', wishlist);
    dispatch(handleWishlist(wishlist));
  };

  return addedWishlist ? (
    <FavoriteIcon
      onClick={updateWishlist}
      sx={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        color: 'red',
        cursor: 'pointer',
      }}
    />
  ) : (
    <FavoriteBorderIcon
      onClick={updateWishlist}
      sx={{
        top: '10px',
        right: '10px',
        color: 'red',
        cursor: 'pointer',
      }}
    />
  );
}

export default Wishlist;
