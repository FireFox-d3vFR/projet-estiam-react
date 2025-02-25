import { ADD_FAVORITE, REMOVE_FAVORITE, ADD_TO_SHOPPING_LIST, REMOVE_FROM_SHOPPING_LIST, UPDATE_SHOPPING_LIST_ITEM, ADD_TO_CART, REMOVE_FROM_CART } from './actions';

const initialState = {
  favorites: [],
  shoppingList: [],
  cart: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(cocktail => cocktail.idDrink !== action.payload),
      };
    case ADD_TO_SHOPPING_LIST:
      return {
        ...state,
        shoppingList: [...state.shoppingList, { ...action.payload, quantity: 1 }],
      };
    case REMOVE_FROM_SHOPPING_LIST:
      return {
        ...state,
        shoppingList: state.shoppingList.filter(item => item.ingredient !== action.payload),
      };
    case UPDATE_SHOPPING_LIST_ITEM:
      return {
        ...state,
        shoppingList: state.shoppingList.map(item =>
          item.ingredient === action.payload.ingredient
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: state.cart.concat(action.payload),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.ingredient !== action.payload),
      };
    default:
      return state;
  }
}
