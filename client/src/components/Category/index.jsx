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
          width: '90%',
          margin: {
            xs: '-10px auto 0',
            md: '0 auto',
            lg: '45px auto 0px',
          },
        }}>
        <Grid
          container
          sx={{
            padding: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'space-between',
            rowGap: { xs: '10px', lg: '0' },
          }}>
          {[...categories]
            .sort((firstCategory, secondCategory) =>
              firstCategory.name.localeCompare(secondCategory.name)
            )
            .map(({ name: categoryName, id }) => (
              <Grid
                item
                key={categoryName}
                sx={{ display: 'flex', justifyContent: 'center' }}
                lg={2}
                xs={4}>
                <Link
                  onClick={() => dispatch(addCategory(id))}
                  to={`./product?categories=${id}`}
                  style={{
                    display: 'flex',
                    textDecoration: 'none',
                    color: '#393D45',
                    margin: '0 auto',
                    justifySelf: 'center',
                  }}>
                  <Typography
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.3rem' },
                      fontWeight: '800',
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
