export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const EMPTY = 'EMPTY';
export const SET_USER = 'SET_USER';

export function addItem(item) {
  return {
    type: ADD_ITEM,
    payload: item
  };
};

export function removeItem(item) {
  return {
    type: REMOVE_ITEM,
    payload: item
  };
};

export function emptyCart() {
  return {
    type: EMPTY
  };
};

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
};