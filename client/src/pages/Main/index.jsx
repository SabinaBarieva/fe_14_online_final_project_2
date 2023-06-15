import { useDispatch } from "react-redux";
import { testReducer } from "../../redux/slices/testSlice";
import { NavLink } from "react-router-dom";
const MainContent = () => {
  const dispatch = useDispatch();
  return (
    <>
      {/* <NavLink to="/home">main content</NavLink> */}
      <NavLink to="/product">product</NavLink>
      <NavLink to="/categories">Categories and filters</NavLink>
      <NavLink to="/basket">basket content</NavLink>
      <div>Main Content</div>
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
