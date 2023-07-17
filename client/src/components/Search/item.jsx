import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Image } from '@mui/icons-material';
import { StyledListItem } from '../../themes/themeSearch';
import { classChange } from '../../redux/slices/searchSlice';
import { getProduct } from '../../redux/slices/productSlice';

export default function Item(props) {
  const dispatch = useDispatch();
  const { name, itemNo } = props;

  const handleIconClick = () => {
    dispatch(classChange());
    dispatch(getProduct(itemNo));
  };

  return (
    <StyledListItem
      key={itemNo}
      to={`product/${itemNo}`}
      onClick={handleIconClick}>
      {name}
    </StyledListItem>
  );
}

Item.propTypes = {
  name: PropTypes.string.isRequired,
  itemNo: PropTypes.string.isRequired,
};
