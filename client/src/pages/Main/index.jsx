import { useDispatch } from "react-redux";
import { getProducts } from "../../redux/slices/productsSlice";

const MainContent = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div>Main Content</div>
      <br />
      <button
        onClick={() => {
          dispatch(getProducts());
        }}
      >
        reducerTest
      </button>
    </>
  );
};
export default MainContent;
