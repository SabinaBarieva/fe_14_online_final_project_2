import React from 'react';
import { useSelector } from 'react-redux';
import { Divider, Typography, Container } from '@mui/material';
import { AdvancedImage } from '@cloudinary/react';
import { Link } from 'react-router-dom';
import WishList from '../../components/WishList';
import { selectWishlist } from '../../redux/selectors';
import cld from '../../cloudinary';

function WishListPage() {
  const wishlist = useSelector(selectWishlist);
  if (wishlist.itemsWishlist.length === 0) {
    return (
      <Container
        sx={{
          width: '100%',
          paddingBottom: '10px',
          maxWidth: '1440px',
          margin: '0 auto 20px',
        }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: { xs: 'center', md: 'right' } }}>
          Your Wishlist
        </Typography>
        <Divider />
        <Typography
          gutterBottom
          sx={{ textAlign: { xs: 'center', md: 'right' } }}>
          You do not have any products at wish list.
        </Typography>
        <Container style={{ padding: '0' }} sx={{ textAlign: 'center' }}>
          <Link
            style={{ textDecoration: 'none', color: '#000000' }}
            to="/product">
            <AdvancedImage
              key={Math.random()}
              cldImg={cld.image('ordernow/sqy5fn7m1tmlelftl4tw.jpg')}
              width="30%"
              height="15%"
            />
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                textAlign: 'center',
                '&:hover': {
                  color: '#42a5f5',
                  textDecoration: 'underline',
                },
              }}>
              Go to PRODUCTS !
            </Typography>
          </Link>
        </Container>
      </Container>
    );
  }
  return <WishList />;
}
export default WishListPage;
