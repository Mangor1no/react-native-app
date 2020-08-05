import {
    GET_TOP_5_ALBUM_US_SUCCESS,
    GET_TOP_5_ALBUM_KOREA,
    GET_TOP_5_ALBUM_VIETNAM,
} from '../actions/actionTypes';

const initialState = {
    resultAlbumUS: [],
    resultAlbumKorea: [],
    resultAlbumVietnam: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TOP_5_ALBUM_US_SUCCESS: {
            console.log('vao reducer', action.payload);
            return {
                ...state,
                resultAlbumUS: [...state.resultAlbumUS, action.payload],
            };
        }
        case GET_TOP_5_ALBUM_KOREA: {
            return {...state};
        }
        case GET_TOP_5_ALBUM_VIETNAM: {
            return {...state};
        }
        default:
            return state;
    }
}
