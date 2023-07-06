import React, { useEffect, useState } from 'react';
import { useSelector, useReducer, useDispatch } from 'react-redux';

import {
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  Slider,
  Stack,
  TextField,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  addCategory,
  fetchFilters,
  removeCategory,
  resetFilters,
  setMaxPrice,
  setMinPrice,
} from '../../redux/slices/filtersSlice';

function Filter() {
  const filterSectionBreakPointWidth = 800;
  const [filterOpen, setFilterOpen] = useState(false);

  const closeCallback = () => {
    setFilterOpen(false);
  };
  const smallScreen = useMediaQuery(
    `(max-width:${filterSectionBreakPointWidth}px)`
  );
  if (!smallScreen) return <FilterSection />;
  return (
    <>
      <IconButton
        onClick={() => {
          setFilterOpen(true);
        }}>
        <FilterAltIcon />
      </IconButton>

      <Dialog fullScreen open={filterOpen}>
        <IconButton onClick={closeCallback}>
          <CancelIcon
            sx={{ position: 'absolute', top: '30px', right: '30px' }}
          />
        </IconButton>

        <FilterSection />
      </Dialog>
    </>
  );
}

function FilterSection() {
  const [priceMinValue, setPriceMinValue] = useState(0);
  const [priceMaxValue, setPriceMaxValue] = useState(0);
  const [priceInputMinValue, setPriceInputMinValue] = useState(0);
  const [priceInputMaxValue, setPriceInputMaxValue] = useState(0);
  const [priceMinBoundary, setPriceMinBoundary] = useState(0);
  const [priceMaxBoundary, setPriceMaxBoundary] = useState(0);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFilters());
  }, []);
  const availableFilters = useSelector(
    (state) => state.filters.availableFilters
  );
  const selectedCategories = useSelector(({ filters }) => filters.categories);
  const isLoadedFilters = useSelector((state) => state.filters.isLoaded);
  const isLoadingFilters = useSelector((state) => state.filters.isLoading);
  useEffect(() => {
    if (isLoadedFilters) {
      const { price, categories: availableCategories } = availableFilters;
      const { min: priceMin, max: priceMax } = price;
      setPriceMinValue(priceMin);
      setPriceMaxValue(priceMax);
      setPriceInputMinValue(priceMin);
      setPriceInputMaxValue(priceMax);
      setPriceMinBoundary(priceMin);
      setPriceMaxBoundary(priceMax);
      setCategories(availableCategories);
    }
  }, [isLoadedFilters]);

  if (isLoadingFilters) return <CircularProgress />;
  if (isLoadedFilters)
    return (
      <section>
        <h2>Filters</h2>
        <Stack sx={{ width: '300px' }} padding={3} spacing={{ xs: 1, sm: 2 }}>
          <FormGroup label="Product Category" sx={{ maxWidth: 300 }}>
            <FormLabel>Product Category</FormLabel>
            {categories
              // .sort((a, b) => a.name - b.name)
              .map(({ name: categoryName }) => (
                <FormControlLabel
                  key={categoryName}
                  control={<Checkbox />}
                  label={categoryName}
                  name={categoryName}
                  checked={selectedCategories.includes(categoryName)}
                  labelPlacement="start"
                  onClick={({ target: { checked, name } }) => {
                    if (checked) dispatch(addCategory(name));
                    else dispatch(removeCategory(name));
                  }}
                />
              ))}
          </FormGroup>

          <FormGroup>
            <FormLabel>Price</FormLabel>
            <Stack spacing={{ xs: 3 }}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <TextField
                    value={priceInputMinValue}
                    size="10"
                    type="number"
                    min={priceMinBoundary}
                    sx={{ width: '100px' }}
                    onChange={({ target: { value } }) => {
                      setPriceInputMinValue(value);
                      if (value <= priceMaxValue)
                        setPriceMinValue(Number(value));
                      dispatch(setMinPrice(Number(value)));
                      if (value < priceMinBoundary)
                        setPriceInputMinValue(priceMinBoundary);
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    value={priceInputMaxValue}
                    type="number"
                    max={priceMaxBoundary}
                    sx={{ width: '100px' }}
                    onChange={({ target: { value } }) => {
                      // console.log(value);
                      setPriceInputMaxValue(value);
                      if (value >= priceMinValue) {
                        setPriceMaxValue(Number(value));
                        dispatch(setMaxPrice(Number(value)));
                      }
                      if (value > priceMaxBoundary)
                        setPriceInputMaxValue(priceMaxBoundary);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container padding="20px" justifyContent="center">
                <Grid item xs>
                  <Slider
                    value={[priceMinValue, priceMaxValue]}
                    valueLabelDisplay="on"
                    disableSwap
                    min={priceMinBoundary}
                    max={priceMaxBoundary}
                    onChange={(_, value) => {
                      const [minValue, maxValue] = value;
                      setPriceMinValue(minValue);
                      setPriceInputMinValue(minValue);
                      setPriceMaxValue(maxValue);
                      setPriceInputMaxValue(maxValue);
                      dispatch(setMinPrice(minValue));
                      dispatch(setMaxPrice(maxValue));
                    }}
                  />
                </Grid>
              </Grid>
            </Stack>
            <Button variant="outlined">Filter</Button>
            <Button
              variant="outlined"
              onClick={() => {
                dispatch(resetFilters());
                setPriceMaxValue(priceMaxBoundary);
                setPriceMinValue(priceMinBoundary);
                setPriceInputMinValue(priceMinBoundary);
                setPriceInputMaxValue(priceMaxBoundary);
              }}>
              Reset
            </Button>
          </FormGroup>
        </Stack>
      </section>
    );
}
export default Filter;
