import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import styled from '@emotion/styled';
import { addCategory, fetchFilters } from '../../redux/slices/filtersSlice';
import theme from '../../themes/theme';

function Category() {
  const dispatch = useDispatch();

  const { categories } = useSelector(({ filters }) => filters.availableFilters);
  const isLoadedFilters = useSelector((state) => state.filters.isLoaded);

  useEffect(() => {
    if (!isLoadedFilters) dispatch(fetchFilters());
  }, [isLoadedFilters]);
  if (isLoadedFilters) {
    return (
      <Box
        sx={{
          maxWidth: 'xl',
          padding: { xs: '0', md: '1rem', lg: '1rem' },
          margin: '20px auto',
        }}>
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'space-between',
          }}>
          {[...categories]
            .sort((firstCategory, secondCategory) =>
              firstCategory.name.localeCompare(secondCategory.name)
            )
            .map(({ name: categoryName, id }) => (
              <Grid
                sx={{ display: 'flex', justifyContent: 'center' }}
                lg={1}
                md={4}
                sm={4}
                xs={6}>
                <Link
                  onClick={() => dispatch(addCategory(id))}
                  to="./product"
                  style={{
                    display: 'flex',
                    textDecoration: 'none',
                    color: '#393D45',
                    margin: '0 auto',
                    justifySelf: 'center',
                  }}>
                  <Typography
                    sx={{
                      fontWeight: '800',
                      fontSize: '25px',
                      '&:hover': {
                        color: theme.palette.primary.light,
                      },
                    }}>
                    {categoryName}
                  </Typography>
                </Link>
              </Grid>
            ))}
        </Grid>
      </Box>
    );
  }
}

export default Category;
