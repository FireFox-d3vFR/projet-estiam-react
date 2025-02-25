import { createSelector } from 'reselect';

const selectCart = state => state.cart;
const selectShoppingList = state => state.shoppingList;

export const getCart = createSelector(
  [selectCart],
  cart => cart || []
);

export const getShoppingList = createSelector(
  [selectShoppingList],
  shoppingList => shoppingList || []
);
