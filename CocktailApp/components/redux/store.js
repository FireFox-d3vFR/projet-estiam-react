import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import favoritesReducer from './reducers';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
