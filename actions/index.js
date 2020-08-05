import {
    GET_TOP_5_ALBUM_US,
    GET_TOP_5_ALBUM_US_SUCCESS,
    GET_TOP_5_ALBUM_US_FAIL,
    GET_TOP_5_ALBUM_KOREA,
    GET_TOP_5_ALBUM_KOREA_SUCCESS,
    GET_TOP_5_ALBUM_KOREA_FAIL,
    GET_TOP_5_ALBUM_VIETNAM,
    GET_TOP_5_ALBUM_VIETNAM_FAIL,
    GET_TOP_5_ALBUM_VIETNAM_SUCCESS,
} from './actionTypes';

import {getTopAlbumUS} from '../api/api';

export const getTopFiveAlbumUS = () => {
    return async (dispatch) => {
        dispatch(getTopFiveAlbumUSStart());

        const result = await getTopAlbumUS();
        if (result) {
            console.log('vao day', result);
            dispatch(getTopFiveAlbumUSSuccess(result));
        } else {
            dispatch(getTopFiveAlbumUSFail());
        }
    };
};

const getTopFiveAlbumUSStart = () => ({
    type: GET_TOP_5_ALBUM_US,
});

const getTopFiveAlbumUSSuccess = (data) => ({
    type: GET_TOP_5_ALBUM_US_SUCCESS,
    payload: {
        ...data,
    },
});

const getTopFiveAlbumUSFail = () => ({
    type: GET_TOP_5_ALBUM_VIETNAM_FAIL,
});
