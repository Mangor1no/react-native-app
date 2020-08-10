import {NAVIGATE_ROUTE} from '../actions/actionTypes';

const initialState = {
    route: 'Discover',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case NAVIGATE_ROUTE: {
            return {
                ...state,
                route: action.payload,
            };
        }
        default:
            return state;
    }
};

export default reducer;
