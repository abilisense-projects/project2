import { createStore, combineReducers } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; 
import alertReducer from'./alertReducer';
const rootReducer = combineReducers({
  alertReducer:alertReducer
  });

// const persistConfig = {
//   key: 'root', 
//   storage, 
  
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(rootReducer);
// const persistor = persistStore(store);
export { store };







