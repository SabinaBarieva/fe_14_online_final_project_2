import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import theme from '../../themes/theme';
import { addCategory, fetchFilters } from '../../redux/slices/filtersSlice';

function Category() {
  const dispatch = useDispatch();

  const { categories } = useSelector(({ filters }) => filters.availableFilters);
  const isLoadedFilters = useSelector((state) => state.filters.isLoaded);

  useEffect(() => {
    if (!isLoadedFilters) dispatch(fetchFilters());
  }, [isLoadedFilters]);
  if (isLoadedFilters) {
    return (
      <Box sx={{ marginBottom: '20px' }}>
        <Grid
          container
          sx={{
            width: '100%',
            justifyContent: 'space-around',
          }}>
          {[...categories]
            .sort((firstCategory, secondCategory) =>
              firstCategory.name.localeCompare(secondCategory.name)
            )
            .map(({ name: categoryName, id }) => (
              <Grid
                item
                lg={1}
                md={2}
                sm={4}
                xs={6}
                sx={{ justifyContent: 'center', display: 'flex' }}>
                <Link
                  to="./product"
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    color: '#000000',
                    margin: '0 auto',
                  }}>
                  <Button
                    sx={{
                      width: 'max-content',
                      height: '40px',
                      fontFamily: theme.typography.fontFamily.primary,
                      fontWeight: '700px',
                      fontSize: '20px',
                      '&:hover': {
                        backgroundColor: '#FFF',
                        border: '1px solid #211F1C',
                      },
                    }}
                    onClick={() => dispatch(addCategory(id))}>
                    <Typography>{categoryName}</Typography>
                  </Button>
                </Link>
              </Grid>
            ))}
        </Grid>
      </Box>
    );
  }
}

export default Category;
