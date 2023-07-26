/* eslint-disable array-callback-return */
import { Close } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { AdvancedImage } from '@cloudinary/react';
import { Link } from 'react-router-dom';
import { LiaTrashSolid } from 'react-icons/lia';
import { closeModalAddBasket } from '../../redux/slices/modalAddToBasket';
import cld from '../../cloudinary';
import theme from '../../themes/theme';
import { selectCart } from '../../redux/selectors';
import { changeQuantityInBasketActionCreator } from '../../redux/slices/basketSlice/changeQuantity';
import { deleteFromBasketActionCreator } from '../../redux/slices/basketSlice/deleteFromBasket';

function ModalAdd() {
  const statusModal = useSelector((state) => state.modalBasket.statusModal);
  const modaladdimg = useSelector((state) => state.modalBasket.modaladdimg);
  const modaladdname = useSelector((state) => state.modalBasket.modaladdname);
  const products = useSelector((state) => state.modalBasket.product);
  const { itemsBasket } = useSelector(selectCart);
  const dispatch = useDispatch();
  let quantity = 0;
  itemsBasket.map(({ product, cartQuantity }) => {
    if (product.itemNo === products.itemNo) {
      quantity = cartQuantity;
    }
  });

  const close = () => {
    dispatch(deleteFromBasketActionCreator(products));
    dispatch(closeModalAddBasket());
  };
  return (
    <Dialog
      open={statusModal}
      sx={{
        textAlign: 'center',
      }}>
      <Close
        sx={{
          position: 'absolute',
          top: { xs: '15px', md: '25px' },
          right: { xs: '15px', md: '25px' },
        }}
        onClick={() => {
          dispatch(closeModalAddBasket());
        }}
      />
      <DialogTitle
        sx={{ background: '#d3dbe3', fontSize: { xs: '17px', md: '32px' } }}>
        Product add to basket
      </DialogTitle>
      <Grid
        sx={{
          margin: '20px',
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <AdvancedImage
          key={Math.random()}
          cldImg={cld.image(modaladdimg[0])}
          width="40%"
          height="80%"
        />
        <Typography
          sx={{ textAlign: 'center', fontSize: { xs: '17px', md: '27px' } }}>
          {modaladdname}
        </Typography>
        <IconButton
          disabled={quantity === 1}
          onClick={() =>
            dispatch(changeQuantityInBasketActionCreator(products, -1))
          }>
          <BiMinus fontSize="15" />
        </IconButton>
        {quantity}
        <IconButton
          onClick={() =>
            dispatch(changeQuantityInBasketActionCreator(products, 1))
          }>
          <BiPlus fontSize="15" />
        </IconButton>
        <IconButton
          onClick={close}
          sx={{
            fontSize: {
              xs: '15px',
              sm: '30px',
              md: '40px',
              lg: '50px',
            },
          }}
          key={Math.random()}
          aria-label="delete">
          <LiaTrashSolid />
        </IconButton>
      </Grid>
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginBottom: '1rem',
        }}>
        <Grid
          item
          md={12}
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            // width: '100%',
          }}>
          <Button
            onClick={() => {
              dispatch(closeModalAddBasket());
            }}
            variant="contained"
            sx={{
              fontSize: { xs: '10px', sm: '13px' },
              backgroundColor: { xs: '#F5F7FB', md: '#211F1C' },
              color: { xs: '#616467', md: '#fff' },
              borderRadius: '7px',
              border: '1px solid #211F1C',
              width: {
                xs: '7rem',
                sm: '11rem',
                md: '12rem',
              },
              height: {
                xs: '2rem',
                sm: '2.5rem',
                md: '3rem',
              },
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
              },
            }}>
            continue shopping
          </Button>
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // width: '100%',
          }}>
          <Link to="./basket">
            <Button
              onClick={() => {
                dispatch(closeModalAddBasket());
              }}
              variant="contained"
              sx={{
                backgroundColor: { xs: '#F5F7FB', md: '#211F1C' },
                color: { xs: '#616467', md: '#fff' },
                borderRadius: '7px',
                fontSize: { xs: '10px', sm: '13px' },
                border: '1px solid #211F1C',
                width: {
                  xs: '7rem',
                  sm: '11rem',
                  md: '12rem',
                },
                height: {
                  xs: '2rem',
                  sm: '2.5rem',
                  md: '3rem',
                },
                '&:hover': {
                  backgroundColor: theme.palette.primary.light,
                },
              }}>
              Go to basket
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Dialog>
  );
}
export default ModalAdd;
