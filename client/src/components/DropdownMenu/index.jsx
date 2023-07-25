import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function DropdownMenu() {
  const [sortOption, setSortOption] = useState('byName'); // Устанавливаем значение по умолчанию "By name"

  return (
    <FormControl sx={{ width: '150px', marginBottom: '15px' }}>
      <InputLabel>Sort By</InputLabel>
      <Select
        value={sortOption}
        label="Sort By"
        onChange={() => {
          console.log('changed');
        }}>
        <MenuItem value="priceHighToLow">Highest price</MenuItem>
        <MenuItem value="priceLowToHigh">Lowest price</MenuItem>
        <MenuItem value="byName">Name</MenuItem>
      </Select>
    </FormControl>
  );
}

export default DropdownMenu;
