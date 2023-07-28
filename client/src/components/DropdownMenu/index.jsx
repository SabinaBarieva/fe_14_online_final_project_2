import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { sortBy } from '../../redux/slices/productsSlice';
import { productsSort } from '../../redux/selectors';

function DropdownMenu() {
  const sortOption = useSelector(productsSort);
  const dispatch = useDispatch();
  return (
    <FormControl sx={{ width: '150px', marginBottom: '15px' }}>
      <InputLabel>Sort By</InputLabel>
      <Select
        value={sortOption}
        label="Sort By"
        onChange={(e) => {
          dispatch(sortBy(e.target.value));
        }}>
        <MenuItem value="-currentPrice">Highest price</MenuItem>
        <MenuItem value="currentPrice">Lowest price</MenuItem>
        <MenuItem value="false">Default</MenuItem>
      </Select>
    </FormControl>
  );
}

export default DropdownMenu;
