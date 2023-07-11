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
  Typography,
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
import { FilterStyles } from '../../themes/themeFilter';

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

      <Dialog
        fullScreen
        open={filterOpen}
        sx={{
          display: 'flex',
        }}>
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
  const minPrice = useSelector(({ filters }) => filters.minPrice);
  const maxPrice = useSelector(({ filters }) => filters.maxPrice);
  const [cachedMinValue, setCachedMinValue] = useState(minPrice);
  const [cachedMaxValue, setCachedMaxValue] = useState(maxPrice);
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
    if (isNumber(value) && value < 0) setCachedMinValue(0);
    else if (value === '') setCachedMinValue(null);
    else if (!isNumber(cachedMinValue) && (value === '1' || value === '-1'))
      setCachedMinValue(priceMinBoundary);
    else if (isNumber(value)) setCachedMinValue(value);
  };
  const maxPriceCallback = ({ target }) => {
    const { value } = target;
    if (value < 0) setCachedMaxValue(0);
    else if (value === '') setCachedMaxValue(null);
    else if (!isNumber(cachedMaxValue) && (value === '1' || value === '-1'))
      setCachedMaxValue(priceMaxBoundary);
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
      <FilterStyles>
        <Typography
          sx={{ fontSize: '20px', fontWeight: '700', fontFamily: 'Roboto' }}>
          Filter
        </Typography>
        <Stack
          sx={{ width: '300px', fontFamily: 'Roboto' }}
          padding={3}
          spacing={{ xs: 1, sm: 2 }}>
          <FormGroup label="Product Category" sx={{ maxWidth: 300 }}>
            <FormLabel
              sx={{ fontWeight: '550', color: '#000', marginBottom: '10px' }}>
              Product Category
            </FormLabel>
            {[...categories]
              .sort((firstCategory, secondCategory) =>
                firstCategory.name.localeCompare(secondCategory.name)
              )
              .map(({ name: categoryName, id }) => (
                <FormControlLabel
                  key={id}
                  control={<Checkbox />}
                  label={`${categoryName}`}
                  name={id}
                  checked={selectedCategories.includes(id)}
                  labelPlacement="start"
                  onClick={categoryCheckboxCallback}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '0',
                  }}
                />
              ))}
            <FormLabel
              sx={{
                margin: '10px 0 20px',
                fontWeight: '550',
                color: '#000',
              }}>
              Price range
            </FormLabel>
            <Stack>
              <Grid container justifyContent="space-between">
                <Grid item xs={6}>
                  <TextField
                    size="small"
                    value={isNumber(cachedMinValue) ? cachedMinValue : ''}
                    placeholder={`${priceMinBoundary} $`}
                    type="number"
                    min={priceMinBoundary}
                    onChange={minPriceCallback}
                    onKeyUp={({ key }) => key === 'Enter' && setPriceCallback()}
                    sx={{ width: '95%' }}
                  />
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                  <TextField
                    size="small"
                    value={isNumber(cachedMaxValue) ? cachedMaxValue : ''}
                    placeholder={`${priceMaxBoundary} $`}
                    type="number"
                    onChange={maxPriceCallback}
                    onKeyUp={({ key }) => key === 'Enter' && setPriceCallback()}
                    sx={{
                      width: '95%',
                      padding: '0',
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Button
                    sx={{
                      minWidth: '100%',
                      borderRadius: '8px',
                      marginTop: '20px',
                      textTransform: 'capitalize',
                      background: '#000',
                    }}
                    variant="contained"
                    onClick={setPriceCallback}>
                    Set Price
                  </Button>
                </Grid>
                <Grid item xs={6} md={12}>
                  <Button
                    sx={{
                      width: { xs: '98%', md: '100%' },
                      marginTop: { xs: '40%', md: '65px' },
                      border: '1px solid #000',
                      borderRadius: '8px',
                      textTransform: 'capitalize',
                    }}
                    variant="outlined"
                    onClick={resetFiltersCallback}>
                    Clear Filter
                  </Button>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                  <Button
                    sx={{
                      display: { md: 'none' },
                      width: { xs: '98%' },
                      marginTop: { xs: '40%' },
                      borderRadius: '8px',
                      textAlign: 'right',
                      textTransform: 'capitalize',
                      background: '#000',
                    }}
                    variant="contained"
                    onClick={resetFiltersCallback}>
                    Apply
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </FormGroup>
        </Stack>
      </FilterStyles>
    );
}
export default Filter;
