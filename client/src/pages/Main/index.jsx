import { useDispatch } from "react-redux";
import { testReducer } from "../../redux/slices/testSlice";
const MainContent = () => {
  return (
    <>
      <div>Main Content</div>
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
