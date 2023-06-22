import { useDispatch, useSelector } from 'react-redux'
import ProductDescription from '../../components/ProductDescription'

const MainContent = () => {
  const dispatch = useDispatch();

  const testSelector = useSelector(state => state.product.product)
  console.log(testSelector);

  return (
    <>
      <div>Main Content</div>
      <br />

    <ProductDescription/>
    </>
  );
};
export default MainContent;
