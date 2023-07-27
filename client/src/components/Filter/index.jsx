import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

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
  // fetchFilters,
  removeCategory,
  resetFilters,
  setMaxPrice,
  setMinPrice,
} from '../../redux/slices/filtersSlice';
import theme from '../../themes/theme';
import FilterStyles from '../../themes/themeFilter';

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

// eslint-disable-next-line react/prop-types
function FilterSection({ priceMinBoundary, priceMaxBoundary }) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const minPrice = useSelector(({ filters }) => filters.minPrice);
  const maxPrice = useSelector(({ filters }) => filters.maxPrice);
  const [cachedMinValue, setCachedMinValue] = useState(minPrice);
  const [cachedMaxValue, setCachedMaxValue] = useState(maxPrice);
  let keyOnePressed = false;
  const { categories, price } = useSelector(
    ({ filters }) => filters.availableFilters
  );
  const selectedCategories = useSelector(({ filters }) => filters.categories);
  const isLoadedFilters = useSelector((state) => state.filters.isLoaded);
  const isLoadingFilters = useSelector((state) => state.filters.isLoading);
  const sort = useSelector((state) => state.products.sort);

  const filterLinkConstructor = () => {
    // Categories;
    const categoryFilter =
      selectedCategories.length > 0
        ? `categories=${selectedCategories.join(',')}`
        : '';
    // Price
    let priceFilter = '';
    if (minPrice !== null) priceFilter += `&minPrice=${minPrice}`;
    if (maxPrice !== null) priceFilter += `&maxPrice=${maxPrice}`;
    // sort
    let sortOrder;
    if (sort === 'currentPrice') {
      sortOrder = '&sort=-currentPrice';
    } else if (sort === '-currentPrice') {
      sortOrder = '&sort=currentPrice';
    } else sortOrder = '';
    console.log(categoryFilter + priceFilter + sortOrder);
  };

  useEffect(() => {
    filterLinkConstructor();
  });

  const isNumber = (number) =>
    number !== null &&
    number !== undefined &&
    number !== '' &&
    !Number.isNaN(number);

  // const categoryCheckboxCallback = ({ target }) => {
  //   const { checked, name } = target;
  //   if (checked) dispatch(addCategory(name));
  //   else dispatch(removeCategory(name));
  // };
  // This function will be called whenever the text input changes
  // const searchHandler = (id) => {
  //   let search;
  //   if (id) {
  //     search = {
  //       categories: id,
  //     };
  //   } else {
  //     search = undefined;
  //   }
  //   setSearchParams(search, { replace: true });
  // };

  const categoryCheckboxCallback = ({ target }) => {
    const { checked, name } = target;
    if (checked) {
      dispatch(addCategory(name));
      // searchHandler(name);
    } else dispatch(removeCategory(name));
  };
  // console.log(searchParams);
  const minPriceCallback = ({ target }) => {
    const { value } = target;
    // if (isNumber(value) && value < 0) setCachedMinValue(0);
    if (value === '') setCachedMinValue(null);
    else if (
      !keyOnePressed &&
      !isNumber(cachedMinValue) &&
      (value === '1' || value === '-1')
    )
      setCachedMinValue(priceMinBoundary);
    else if (isNumber(value)) setCachedMinValue(value);
  };
  const maxPriceCallback = ({ target }) => {
    const { value } = target;
    // if (value < 0) setCachedMaxValue(0);
    if (value === '') setCachedMaxValue(null);
    else if (
      !keyOnePressed &&
      !isNumber(cachedMaxValue) &&
      (value === '1' || value === '-1')
    )
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
  const setCorrectMinValue = () => {
    if (+cachedMinValue < priceMinBoundary && cachedMinValue !== null) {
      setCachedMinValue(priceMinBoundary);
    }
    if (+cachedMinValue > priceMaxBoundary) {
      setCachedMinValue(priceMaxBoundary);
    }
    if (+cachedMinValue > +cachedMaxValue && cachedMaxValue !== null) {
      setCachedMinValue(+cachedMaxValue);
    }
  };
  const setCorrectMaxValue = () => {
    if (+cachedMaxValue > priceMaxBoundary) {
      setCachedMaxValue(priceMaxBoundary);
    }
    if (+cachedMaxValue < priceMinBoundary && cachedMaxValue !== null) {
      setCachedMaxValue(priceMinBoundary);
    }
    if (+cachedMinValue > +cachedMaxValue) {
      setCachedMaxValue(+cachedMinValue);
    }
  };
  if (isLoadingFilters) return <CircularProgress />;
  if (isLoadedFilters)
    return (
      <FilterStyles>
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: theme.typography.const.fontWeight.bold,
            //   fontFamily: 'Roboto'
          }}>
          Filter
        </Typography>
        <Stack
          sx={{
            width: '250px',
            //   fontFamily: 'Roboto'
          }}
          padding={3}
          spacing={{ xs: 1, sm: 2 }}>
          <FormGroup label="Product Category" sx={{ maxWidth: 250 }}>
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
                  label={categoryName}
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
                    label="Min"
                    type="tel"
                    min={priceMinBoundary}
                    onBlur={() => {
                      setCorrectMinValue();
                    }}
                    onChange={minPriceCallback}
                    onKeyUp={({ key }) => key === 'Enter' && setPriceCallback()}
                    onKeyDown={({ key }) => {
                      if (key === '1' && cachedMinValue === null)
                        keyOnePressed = true;
                    }}
                    sx={{ width: '95%' }}
                  />
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                  <TextField
                    size="small"
                    value={isNumber(cachedMaxValue) ? cachedMaxValue : ''}
                    label="Max"
                    type="tel"
                    onBlur={() => {
                      setCorrectMaxValue();
                    }}
                    onChange={maxPriceCallback}
                    onKeyUp={({ key }) => key === 'Enter' && setPriceCallback()}
                    onKeyDown={({ key }) => {
                      if (key === '1' && cachedMaxValue === null)
                        keyOnePressed = true;
                    }}
                    sx={{
                      width: '95%',
                      padding: '0',
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container sx={{ marginTop: '35px' }}>
                <Grid item xs={12}>
                  <Button
                    sx={{
                      width: '98%',
                      border: '1px solid #000',
                      borderRadius: '8px',
                      textTransform: 'capitalize',
                    }}
                    variant="outlined"
                    onClick={resetFiltersCallback}>
                    Clear Filter
                  </Button>
                </Grid>
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
              </Grid>
            </Stack>
          </FormGroup>
        </Stack>
      </FilterStyles>
    );
}
export default Filter;
