import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '@mui/material';
import { Box, display } from '@mui/system';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { addCategory, fetchFilters } from '../../redux/slices/filtersSlice';

function Category() {
  const dispatch = useDispatch();

  const { categories } = useSelector(({ filters }) => filters.availableFilters);
  const isLoadedFilters = useSelector((state) => state.filters.isLoaded);
  const isLoadingFilters = useSelector((state) => state.filters.isLoading);

  useEffect(() => {
    if (!isLoadedFilters) dispatch(fetchFilters());
  }, [isLoadedFilters]);
  if (isLoadedFilters) {
    return (
      <Grid
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        {[...categories]
          .sort((firstCategory, secondCategory) =>
            firstCategory.name.localeCompare(secondCategory.name)
          )
          .map(({ name: categoryName, id }) => (
            <Grid>
              <Link to="./product">
                <Button onClick={() => dispatch(addCategory(id))}>
                  {categoryName}
                </Button>
              </Link>
            </Grid>
          ))}
      </Grid>
    );
  }
}

export default Category;
