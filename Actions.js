export const GET_ITEMS = 'GET_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const EMPTY = 'EMPTY';

export function addItem(item) {
    return {
      type: ADD_ITEM,
      payload: item
    };
  };
  export function emptyCart() {
    return {
      type: EMPTY
    };
  };