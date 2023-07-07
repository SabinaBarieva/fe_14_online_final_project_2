import React, { useEffect, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productsSlice';
import {
  setSelect,
  setValue,
  classChange,
  close,
} from '../../redux/slices/searchSlice';
import {
  StyledSearch,
  StyledButtonIcon,
  StyledInput,
  StyledSearchWrapper,
} from '../../themes/themeSearch';
import List from './list';

export default function Search() {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.search.statusValue);
  const input = useSelector((state) => state.search.statusInput);
  const select = useSelector((state) => state.search.statusSelect);
  const inputClass = useSelector((state) => state.search.statusInputClass);
  const statusIconType = useSelector((state) => state.search.statusIconType);
  const products = useSelector((state) => state.products.products);
  const searchRef = useRef(null);

  if (products.length === 0) {
    dispatch(fetchProducts({}));
  }

  const renderIcon = () => {
    if (statusIconType === 'search') {
      return <SearchIcon />;
    }
    if (statusIconType === 'close') {
      return <CloseIcon />;
    }
    return null;
  };

  const valueChange = (event) => {
    const inputValue = event.target.value;
    dispatch(setValue(inputValue));
    if (inputValue.length >= 3) {
      dispatch(setSelect(true));
    } else {
      dispatch(setSelect(false));
    }
  };
  const handleIconClick = () => {
    dispatch(classChange());
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      dispatch(close());
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <StyledSearchWrapper component="div" ref={searchRef}>
      <StyledSearch>
        <StyledButtonIcon onClick={handleIconClick}>
          {renderIcon()}
        </StyledButtonIcon>
        {input && (
          <StyledInput
            value={value}
            onChange={valueChange}
            className={inputClass}
          />
        )}
      </StyledSearch>
      {select && <List />}
    </StyledSearchWrapper>
  );
}
