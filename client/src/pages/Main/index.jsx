import { useDispatch } from "react-redux";
// import { testReducer } from "../../redux/slices/testSlice";
import Carousel from '../../components/Carousel';
const MainContent = () => {
  return (
    <>
      <div>Main Content</div>
      <Carousel />
      <br />
      <button
        onClick={() => {
          dispatch(testReducer());
        }}
      >
        reducerTest
      </button>
    </>
  );
};
export default MainContent;
