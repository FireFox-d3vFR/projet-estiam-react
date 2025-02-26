export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const ADD_TO_SHOPPING_LIST = "ADD_TO_SHOPPING_LIST";
export const REMOVE_FROM_SHOPPING_LIST = "REMOVE_FROM_SHOPPING_LIST";
export const UPDATE_SHOPPING_LIST_ITEM = "UPDATE_SHOPPING_LIST_ITEM";
export const RESET_SHOPPING_LIST_ITEM = "RESET_SHOPPING_LIST_ITEM";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const addFavorite = (cocktail) => ({
    type: ADD_FAVORITE,
    payload: cocktail
});

export const removeFavorite = (id) => ({
    type: REMOVE_FAVORITE,
    payload: id,
});

export const addToShoppingList = (ingredient) => ({
  type: ADD_TO_SHOPPING_LIST,
  payload: ingredient,
});

export const removeFromShoppingList = (ingredient) => ({
  type: REMOVE_FROM_SHOPPING_LIST,
  payload: ingredient,
});

export const updateShoppingListItem = (ingredient, quantity) => ({
  type: UPDATE_SHOPPING_LIST_ITEM,
  payload: { ingredient, quantity },
});

export const resetShoppingListItem = (ingredient) => ({
    type: RESET_SHOPPING_LIST_ITEM,
    payload: ingredient,
})

export const addToCart = (items) => ({
  type: ADD_TO_CART,
  payload: items,
});

export const removeFromCart = (item) => ({
  type: REMOVE_FROM_CART,
  payload: item,
});
