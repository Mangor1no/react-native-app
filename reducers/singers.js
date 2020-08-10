import {GET_TOP_SINGERS_SUCCESS} from '../actions/actionTypes';

const initialState = {
    resultTopSingers: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TOP_SINGERS_SUCCESS: {
            return {
                ...state,
                resultTopSingers: action.payload,
            };
        }
        default:
            return state;
    }
};

export default reducer;
