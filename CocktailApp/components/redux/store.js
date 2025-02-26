import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { favoriteReducer, cartReducer, shoppingListReducer } from "./reducers";

const store = configureStore({
  reducer: {
    favorites: favoriteReducer,
    cart: cartReducer,
    shoppingList: shoppingListReducer,
  },
});

export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
