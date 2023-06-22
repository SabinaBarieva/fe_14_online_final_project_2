import { useDispatch } from "react-redux";
import { getProduct } from "../../redux/slices/currentProductSlice";

const MainContent = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div>Main Content</div>
      <br />
      <button
        onClick={() => {
          dispatch(getProduct());
        }}
      >
        reducerTest
      </button>
    </>
  );
};
export default MainContent;
