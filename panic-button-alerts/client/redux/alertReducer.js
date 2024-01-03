const alertReducer = (state = {
  alert: [],
}, action) => {
  switch (action.type) {
    case 'INSERTINGANARRAY':
      return {
        ...state,
        alert: action.payload,
      };
    case 'UPDATE_ARRAY':
      return {
        ...state,
        alert: [...state.alert, action.payload],
      };
    default:
      return state;
  }
};

export default alertReducer;
