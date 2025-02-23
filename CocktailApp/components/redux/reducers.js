import { ADD_FAVORITE, REMOVE_FAVORITE } from './actions';

const initialState = {
  favorites: [],
};

export default function favoritesReducer(state = initialState, action) {
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
    default:
      return state;
  }
}
