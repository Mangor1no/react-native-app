import {
    GET_TOP_5_ALBUM_US_SUCCESS,
    GET_TOP_5_ALBUM_KOREA_SUCCESS,
    GET_TOP_5_ALBUM_VIETNAM_SUCCESS,
    GET_ALBUM_FOR_NEW_DAY_SUCCESS,
    GET_ALBUM_US_RAP_HIPHOP_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
    resultAlbumUS: [],
    resultAlbumKorea: [],
    resultAlbumVietnam: [],
    resultAlbumForNewDay: [],
    resultAlbumUSRapHiphop: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TOP_5_ALBUM_US_SUCCESS: {
            return {
                ...state,
                resultAlbumUS: action.payload,
            };
        }
        case GET_TOP_5_ALBUM_KOREA_SUCCESS: {
            return {
                ...state,
                resultAlbumKorea: action.payload,
            };
        }
        case GET_TOP_5_ALBUM_VIETNAM_SUCCESS: {
            return {
                ...state,
                resultAlbumVietnam: action.payload,
            };
        }
        case GET_ALBUM_FOR_NEW_DAY_SUCCESS: {
            return {
                ...state,
                resultAlbumForNewDay: action.payload,
            };
        }
        case GET_ALBUM_US_RAP_HIPHOP_SUCCESS: {
            return {
                ...state,
                resultAlbumUSRapHiphop: action.payload,
            };
        }
        default:
            return state;
    }
};

export default reducer;
