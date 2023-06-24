import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { getProduct } from '../../redux/slices/productSlice';
import { useEffect } from 'react';
import { productCurrent } from '../../redux/selectors';

const Code = styled('div')({
  textAlign: 'right',
  letterSpacing: '0.015em',
  color: '#9A9292',
});
const Title = styled('div')({
  fontWeight: '400',
  fontSize: '40px',
  lineHeight: '47px',
  color: '#616467',
});
const Description = styled('div')({
  fontWeight: '400',
  fontSize: '18px',
  letterSpacing: '0.015em',
  color: '#9A9292',
  margin: '10px 0',
});
const Price = styled('div')({
  fontWeight: '500',
  fontSize: '20px',
  lineHeight: '132%',
  letterSpacing: '0.015em',
  color: '#434343',
  margin: '10px 0',
});
const CountBoxes = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '46px',
  height: '46px',
  background: '#F5F7FB',
});

function ProductDescription() {
  const dispatch = useDispatch();
  const {
    enabled,
    name,
    currentPrice,
    categories,
    imageUrls,
    quantity,
    color,
    brand,
    storage,
    itemNo,
    description,
    guarantee,
  } = useSelector(productCurrent);
  useEffect(() => {
    dispatch(getProduct());
    console.log();
  }, [dispatch]);

  return (
    <Grid container sx={{ width: '85%', margin: '15px auto' }}>
      <Grid
        item
        xs={12}
        sm={12}
        md={5}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <img src={imageUrls} alt={name} />
      </Grid>
      <Grid item xs={12} sm={12} md={7}>
        <Code>{itemNo}</Code>
        <Title>
          {name} {storage} {color}
        </Title>
        <Description>{description}</Description>
        <Price>Price: {currentPrice}$</Price>
        <Grid container>
          <Grid item md={4} xs={12} sx={{ display: 'flex', gap: '14px' }}>
            <CountBoxes
              sx={{
                width: { xs: '35px', sm: '57px', md: '46px' },
                height: { xs: '35px', sm: '57px', md: '46px' },
              }}>
              -
            </CountBoxes>
            <CountBoxes
              sx={{
                width: { xs: '35px', sm: '57px', md: '46px' },
                height: { xs: '35px', sm: '57px', md: '46px' },
              }}>
              1
            </CountBoxes>
            <CountBoxes
              sx={{
                width: { xs: '35px', sm: '57px', md: '46px' },
                height: { xs: '35px', sm: '57px', md: '46px' },
              }}>
              +
            </CountBoxes>
          </Grid>
          <Grid item md={8} xs={12}>
            <Button
              sx={{
                marginTop: { xs: '10px', md: '0' },
                padding: '9px 18px',
                backgroundColor: { xs: '#F5F7FB', md: '#211F1C' },
                color: { xs: '#616467', md: '#fff' },
                borderRadius: 0,
                border: '1px solid #211F1C',
                '&:hover': {
                  backgroundColor: { xs: '#211F1C', md: '#fff' },
                  color: { xs: '#F5F7FB', md: '#211F1C' },
                  border: { xs: '1px solid #211F1C', md: '1px solid #211F1C' },
                },
              }}
              variant="contained">
              Add to basket
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default ProductDescription;
