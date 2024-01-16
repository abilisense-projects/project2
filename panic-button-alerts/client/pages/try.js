// YourComponent.js
import { useDispatch } from 'react-redux';
import { InsertingAnArray,updateArrayAction } from '../redux/alertAction';


const YourComponent = () => {
  const dispatch = useDispatch();

  const yourArray = [/* your array data */];

  const handleButtonClick = () => {
    dispatch(InsertingAnArray(yourArray));
  };
  return (
    <div>
      {/* Your component JSX */}
      <button onClick={handleButtonClick}>Update Array</button>
    </div>
  );
};
export default YourComponent;