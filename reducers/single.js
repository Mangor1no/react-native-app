import {GET_TOP_SINGLE_US_SUCCESS} from '../actions/actionTypes';

const initialState = {
    resultSingleUS: [],
    // resultSingleKorea: [],
    // resultSingleVietnam: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TOP_SINGLE_US_SUCCESS: {
            return {
                ...state,
                resultSingleUS: action.payload,
            };
        }
        default:
            return state;
    }
};

export default reducer;
