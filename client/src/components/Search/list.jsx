import React from 'react';
import { useSelector } from 'react-redux';
import { StyledList } from '../../themes/themeSearch';
import Item from './item';

export default function List() {
  const productsArray = useSelector((state) => state.searchList.resultArray);
  const isFetched = useSelector((state) => state.searchList.isFetched);
  const value = useSelector((state) => state.search.statusValue);

  const result = productsArray.filter(
    (item) =>
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.brand.toLowerCase().includes(value.toLowerCase()) ||
      item.color.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div>
      {isFetched && (
        <StyledList component="div">
          {result.map((item) => (
            <Item item={item} key={item.itemNo} />
          ))}
        </StyledList>
      )}
    </div>
  );
}
