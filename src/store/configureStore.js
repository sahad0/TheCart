import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {createStore} from 'redux';
import rootReducers from './rootReducer';

const configureStore = () => {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

  return createStore(persistReducer(persistConfig, rootReducers));
};

export const store = configureStore();
