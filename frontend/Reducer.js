import {server} from './Constants.js';

const initialState = {
    items: [],
    price: 0,
    user: null
  };

export default function Reducer(state = initialState, action) {
switch (action.type) {
    case 'ADD_ITEM':
        return {
            ...state,
            items: state.items.concat(action.payload),
            price: state.price + action.payload.price
        };
    case 'REMOVE_ITEM':
        return {
            ...state,
            items: [...state.items.slice(0, state.items.indexOf(action.payload)),
                ...state.items.slice(state.items.indexOf(action.payload) + 1)],
            price: state.price - action.payload.price
        };
    case 'EMPTY':
        return {
            ...state,
            items: [],
            price: 0
        };
    case 'SET_USER':
        return {
            ...state,
            user: action.payload
        };
    default:
    return state;
}
};

