import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
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
import theme from '../../themes/theme';

function Filter() {
  const [filterOpen, setFilterOpen] = useState(false);

  const closeCallback = () => {
    setFilterOpen(false);
  };
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'));
  return !smallScreen ? (
    <FilterSection />
  ) : (
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
  const dispatch = useDispatch();
  const [cachedMinValue, setCachedMinValue] = useState(null);
  const [cachedMaxValue, setCachedMaxValue] = useState(null);
  const [priceMinBoundary, setPriceMinBoundary] = useState();
  const [priceMaxBoundary, setPriceMaxBoundary] = useState();
  const { categories, price } = useSelector(
    ({ filters }) => filters.availableFilters
  );
  const selectedCategories = useSelector(({ filters }) => filters.categories);
  const isLoadedFilters = useSelector((state) => state.filters.isLoaded);
  const isLoadingFilters = useSelector((state) => state.filters.isLoading);
  useEffect(() => {
    if (!isLoadedFilters) dispatch(fetchFilters());
    else {
      const { min: priceMin, max: priceMax } = price;
      setPriceMinBoundary(priceMin);
      setPriceMaxBoundary(priceMax);
    }
  }, [isLoadedFilters]);
  const isNumber = (number) =>
    number !== null &&
    number !== undefined &&
    number !== '' &&
    !Number.isNaN(number);
  const categoryCheckboxCallback = ({ target }) => {
    const { checked, name } = target;
    if (checked) dispatch(addCategory(name));
    else dispatch(removeCategory(name));
  };
  const minPriceCallback = ({ target }) => {
    const { value } = target;
    if (value < 0) setCachedMinValue(0);
    else if (!isNumber(cachedMinValue)) setCachedMinValue(priceMinBoundary);
    else if (isNumber(value)) setCachedMinValue(value);
  };
  const maxPriceCallback = ({ target }) => {
    const { value } = target;
    if (value < 0) setCachedMaxValue(0);
    else if (!isNumber(cachedMaxValue)) setCachedMaxValue(priceMaxBoundary);
    else if (isNumber(value)) setCachedMaxValue(value);
  };
  const setPriceCallback = () => {
    dispatch(setMinPrice(cachedMinValue));
    dispatch(setMaxPrice(cachedMaxValue));
  };
  const resetFiltersCallback = () => {
    dispatch(resetFilters());
    setCachedMinValue(null);
    setCachedMaxValue(null);
  };
  if (isLoadingFilters) return <CircularProgress />;
  if (isLoadedFilters)
    return (
      <section>
        <h2>Filters</h2>
        <Stack sx={{ width: '300px' }} padding={3} spacing={{ xs: 1, sm: 2 }}>
          <FormGroup label="Product Category" sx={{ maxWidth: 300 }}>
            <FormLabel>Product Category</FormLabel>
            {[...categories]
              .sort((firstCategory, secondCategory) =>
                firstCategory.name.localeCompare(secondCategory.name)
              )
              .map(({ name: categoryName, id, quantity }) => (
                <FormControlLabel
                  key={id}
                  control={<Checkbox />}
                  label={`${categoryName} (${quantity})`}
                  name={id}
                  checked={selectedCategories.includes(id)}
                  labelPlacement="start"
                  onClick={categoryCheckboxCallback}
                />
              ))}
            <FormLabel>Price</FormLabel>
            <Stack spacing={{ xs: 3 }}>
              <Grid
                container
                spacing={2}
                rowGap={2}
                justifyContent="center"
                justifyItems="center">
                <Grid item>
                  <TextField
                    value={isNumber(cachedMinValue) ? cachedMinValue : ''}
                    placeholder="Min"
                    size="10"
                    type="number"
                    min={priceMinBoundary}
                    sx={{ width: '100px' }}
                    onChange={minPriceCallback}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    value={isNumber(cachedMaxValue) ? cachedMaxValue : ''}
                    placeholder="Max"
                    type="number"
                    sx={{ width: '100px' }}
                    onChange={maxPriceCallback}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={setPriceCallback}>
                    Set Price
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    width={3}
                    onClick={resetFiltersCallback}>
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </FormGroup>
        </Stack>
      </section>
    );
}
export default Filter;