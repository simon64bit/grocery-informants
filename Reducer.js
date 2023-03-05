const initialState = {
    items: [],
    price: 0
  };

export default function Reducer(state = initialState, action) {
switch (action.type) {
    case 'ADD_ITEM':
    return {
        ...state,
        items: state.items.concat(action.payload),
        price: state.price + action.payload.price
    };
    case 'EMPTY':
    return {
        ...state,
        items: [],
        price: 0
    };
    default:
    return state;
}
};

