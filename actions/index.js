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
    NAVIGATE_ROUTE,
    GET_ALBUM_FOR_NEW_DAY,
    GET_ALBUM_FOR_NEW_DAY_SUCCESS,
    GET_ALBUM_FOR_NEW_DAY_FAIL,
    GET_TOP_SINGERS,
    GET_TOP_SINGERS_SUCCESS,
    GET_TOP_SINGERS_FAIL,
    GET_ALBUM_US_RAP_HIPHOP_FAIL,
    GET_ALBUM_US_RAP_HIPHOP_SUCCESS,
    GET_ALBUM_US_RAP_HIPHOP,
} from './actionTypes';

import {
    getTopAlbumUS,
    getTopAlbumVietnam,
    getTopAlbumKorea,
    getAlbumForNewDay,
    getTopSingers,
    getTopAlbumUSRapHiphop,
} from '../api/api';

export const getTopFiveAlbumUS = () => {
    return async (dispatch) => {
        dispatch(getTopFiveAlbumUSStart());

        const result = await getTopAlbumUS();
        if (result) {
            dispatch(getTopFiveAlbumUSSuccess(result));
        } else {
            dispatch(getTopFiveAlbumUSFail());
        }
    };
};

export const getTopFiveAlbumKorea = () => {
    return async (dispatch) => {
        dispatch(getTopFiveAlbumKoreaStart());

        const result = await getTopAlbumKorea();
        if (result) {
            dispatch(getTopFiveAlbumKoreaSuccess(result));
        } else {
            dispatch(getTopFiveAlbumKoreaFail());
        }
    };
};

export const getTopFiveAlbumVietnam = () => {
    return async (dispatch) => {
        dispatch(getTopFiveAlbumVietnamStart());

        const result = await getTopAlbumVietnam();
        if (result) {
            dispatch(getTopFiveAlbumVietnamSuccess(result));
        } else {
            dispatch(getTopFiveAlbumVietnamFail());
        }
    };
};

export const getRandomAlbumForNewDay = () => {
    return async (dispatch) => {
        dispatch(getAlbumForNewDayStart());

        const result = await getAlbumForNewDay();
        if (result) {
            dispatch(getAlbumForNewDaySuccess(result));
        } else {
            dispatch(getAlbumForNewDayFail());
        }
    };
};

export const getTopSinger = () => {
    return async (dispatch) => {
        dispatch(getTopSingerStart());

        const result = await getTopSingers();
        if (result) {
            dispatch(getTopSingerSuccess(result));
        } else {
            dispatch(getTopSingerFail());
        }
    };
};

export const getAlbumUSRapHiphop = () => {
    return async (dispatch) => {
        dispatch(getTopAlbumUSRapHiphopStart());

        const result = await getTopAlbumUSRapHiphop();
        if (result) {
            dispatch(getTopAlbumUSRapHiphopSuccess(result));
        } else {
            dispatch(getTopAlbumUSRapHiphopFail());
        }
    };
};

const getAlbumForNewDayStart = () => ({
    type: GET_ALBUM_FOR_NEW_DAY,
});

const getAlbumForNewDaySuccess = (data) => ({
    type: GET_ALBUM_FOR_NEW_DAY_SUCCESS,
    payload: {
        ...data,
    },
});

const getAlbumForNewDayFail = () => ({
    type: GET_ALBUM_FOR_NEW_DAY_FAIL,
});

export const navigateRoute = (route) => {
    return (dispatch) => {
        dispatch(navigateRouteStart(route));
    };
};

const navigateRouteStart = (route) => ({
    type: NAVIGATE_ROUTE,
    payload: route,
});

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
    type: GET_TOP_5_ALBUM_US_FAIL,
});

const getTopFiveAlbumKoreaStart = () => ({
    type: GET_TOP_5_ALBUM_KOREA,
});

const getTopFiveAlbumKoreaSuccess = (data) => ({
    type: GET_TOP_5_ALBUM_KOREA_SUCCESS,
    payload: {
        ...data,
    },
});

const getTopFiveAlbumKoreaFail = () => ({
    type: GET_TOP_5_ALBUM_KOREA_FAIL,
});

const getTopFiveAlbumVietnamStart = () => ({
    type: GET_TOP_5_ALBUM_VIETNAM,
});

const getTopFiveAlbumVietnamSuccess = (data) => ({
    type: GET_TOP_5_ALBUM_VIETNAM_SUCCESS,
    payload: {
        ...data,
    },
});

const getTopFiveAlbumVietnamFail = () => ({
    type: GET_TOP_5_ALBUM_VIETNAM_FAIL,
});

const getTopSingerStart = () => ({
    type: GET_TOP_SINGERS,
});

const getTopSingerSuccess = (data) => ({
    type: GET_TOP_SINGERS_SUCCESS,
    payload: {
        ...data,
    },
});

const getTopSingerFail = () => ({
    type: GET_TOP_SINGERS_FAIL,
});

const getTopAlbumUSRapHiphopStart = () => ({
    type: GET_ALBUM_US_RAP_HIPHOP,
});

const getTopAlbumUSRapHiphopSuccess = (data) => ({
    type: GET_ALBUM_US_RAP_HIPHOP_SUCCESS,
    payload: {
        ...data,
    },
});

const getTopAlbumUSRapHiphopFail = () => ({
    type: GET_ALBUM_US_RAP_HIPHOP_FAIL,
});
