import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  ADD_TO_SHOPPING_LIST,
  REMOVE_FROM_SHOPPING_LIST,
  UPDATE_SHOPPING_LIST_ITEM,
  RESET_SHOPPING_LIST_ITEM,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "./actions";

export function favoriteReducer(state = { favorites: [] }, action) {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          (cocktail) => cocktail.idDrink !== action.payload
        ),
      };
    default:
      return state;
  }
}

export function cartReducer(state = { cart: [] }, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: state.cart.concat(action.payload),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.ingredient !== action.payload),
      };
      case UPDATE_SHOPPING_LIST_ITEM:
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.ingredient === action.payload.ingredient
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        };
    default:
      return state;
  }
}

export function shoppingListReducer(state = { shoppingList: [] }, action) {
  console.log("Reducer action:", action);
  switch (action.type) {
    case ADD_TO_SHOPPING_LIST:
      return {
        ...state,
        shoppingList: [
          ...state.shoppingList,
          { ...action.payload, quantity: 1 },
        ],
      };
    case REMOVE_FROM_SHOPPING_LIST:
      return {
        ...state,
        shoppingList: state.shoppingList.filter(
          (item) => item.ingredient !== action.payload
        ),
      };
    case UPDATE_SHOPPING_LIST_ITEM:
      const itemExists = state.shoppingList.find(
        (item) => item.ingredient === action.payload.ingredient
      );
      if (itemExists) {
        return {
          ...state,
          shoppingList: state.shoppingList.map((item) =>
            item.ingredient === action.payload.ingredient
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          shoppingList: [
            ...state.shoppingList,
            {
              ingredient: action.payload.ingredient,
              quantity: action.payload.quantity,
            },
          ],
        };
      }
    case RESET_SHOPPING_LIST_ITEM:
      return {
        ...state,
        shoppingList: state.shoppingList.map((item) =>
          item.ingredient === action.payload ? { ...item, quantity: 0 } : item
        ),
      };
    default:
      return state;
  }
}
