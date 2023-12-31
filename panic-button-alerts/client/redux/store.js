import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import registerReducers from './reducers/registerReducers';
import userReducer from './reducers/loginReducers';
const rootReducer = combineReducers({
  userReducer: userReducer,
  register: registerReducers,
});

const persistConfig = {
  key: 'root', 
  storage, 
  
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);
export { store, persistor };







