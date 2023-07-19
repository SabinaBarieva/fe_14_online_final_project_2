import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { AdvancedImage } from '@cloudinary/react';
import cld from '../../cloudinary';
import { StyledListItem, StyledListItemText } from '../../themes/themeSearch';
import { classChange } from '../../redux/slices/searchSlice';
import { getProduct } from '../../redux/slices/productSlice';

export default function Item(props) {
  const dispatch = useDispatch();
  const { item } = props;

  const handleIconClick = () => {
    dispatch(classChange());
    dispatch(getProduct(item.itemNo));
  };

  return (
    <StyledListItem
      key={item.itemNo}
      to={`product/${item.itemNo}`}
      onClick={handleIconClick}>
      <AdvancedImage
        key={item.itemNo}
        alt={item.name}
        cldImg={cld.image(item.imageUrls[0])}
        width="20%"
        height="100%"
      />
      <StyledListItemText>{item.name}</StyledListItemText>
    </StyledListItem>
  );
}

Item.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};
