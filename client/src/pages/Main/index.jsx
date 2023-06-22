import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ProductDescription from '../../components/ProductDescription'
import { product } from '../../redux/selectors';
import { getProduct } from '../../redux/slices/productSlice';

const MainContent = () => {
  const dispatch = useDispatch()
  const currentProduct = useSelector(product)

  useEffect(()=>{
  dispatch(getProduct())
  }, [dispatch])

  return (
    <>
      <div>Main Content</div>
      <br />

    <ProductDescription/>
    </>
  );
};
export default MainContent;
