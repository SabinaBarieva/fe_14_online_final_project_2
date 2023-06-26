import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { getProduct } from '../../redux/slices/productSlice';
import { currentProduct, cpIsLoaded } from '../../redux/selectors';

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
  margin: '15px 0',
});
const Price = styled('div')({
  fontWeight: '500',
  fontSize: '20px',
  lineHeight: '132%',
  letterSpacing: '0.015em',
  color: '#434343',
});
const CountBoxes = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '46px',
  height: '46px',
  background: '#F5F7FB',
});
const Guarantee = styled('div')({
  textAlign: 'right',
  fontWeight: '400',
  fontSize: '18px',
  letterSpacing: '0.015em',
  color: '#9A9292',
  margin: '15px 0',
});

function ProductDescription() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(77552));
  }, [dispatch]);

  const changeMainPhoto = (e) => {
    const mainPhoto = document.querySelector('.main-photo');
    if (e.target.classList.contains('photo-from-gallery')) {
      mainPhoto.src = e.target.getAttribute('src');
    }
  };

  const {
    // enabled,
    // quantity,
    // categories,
    name,
    currentPrice,
    imageUrls,
    color,
    brand,
    storage,
    itemNo,
    description,
    guarantee,
  } = useSelector(currentProduct);
  const isLoaded = useSelector(cpIsLoaded);

  if (isLoaded) {
    return (
      <Grid container sx={{ width: '90%', margin: '25px auto' }}>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <img
            className="main-photo"
            src={imageUrls[0]}
            alt={name}
            width={'100%'}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            width: '90%',
          }}>
          <Code>{itemNo} :CODE</Code>
          <Title>
            {brand} {name} {storage} {color}
          </Title>
          <Description>{description}</Description>
          <Price>Price: {currentPrice}$</Price>
          <Guarantee>Apple guarantee {guarantee}</Guarantee>
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
                    border: {
                      xs: '1px solid #211F1C',
                      md: '1px solid #211F1C',
                    },
                  },
                }}
                variant="contained">
                Add to basket
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: '15px',
            }}>
            {imageUrls.map((photo) => (
              <Grid
                key={photo}
                item
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <img
                  className="photo-from-gallery"
                  src={photo}
                  alt="img"
                  width={'85px'}
                  height={'85px'}
                  onClick={changeMainPhoto}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return <div>LOADING</div>;
}

export default ProductDescription;
