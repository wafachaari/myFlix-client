 
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const SET_BUTTON = 'SET_BUTTON';
export const SET_FAVORITE = 'SET_FAVORITE';

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUser(value) {
  return { type: SET_USER, value };
}

export function setButton(value) {
  return { type: SET_BUTTON, value };
}

export function setFavorite(value) {
  return { type: SET_FAVORITE, value };
}