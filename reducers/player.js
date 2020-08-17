import {
    SELECT_SONG,
    LOOP_MODE,
    SET_SONG_DURATION,
    SET_SONG_CURRENT_POSITION,
    PLAY_STATUS,
} from '../actions/actionTypes';

const initialState = {
    tripSongUrl: [],
    loopMode: 'one',
    playStatus: true,
    songDuration: 0,
    songCurrentPosition: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_SONG: {
            return {
                ...state,
                tripSongUrl: action.payload,
            };
        }
        case LOOP_MODE: {
            return {
                ...state,
                loopMode: action.payload.data,
            };
        }
        case SET_SONG_DURATION: {
            return {
                ...state,
                songDuration: action.payload.data,
            };
        }
        case SET_SONG_CURRENT_POSITION: {
            return {
                ...state,
                songCurrentPosition: action.payload.data,
            };
        }
        case PLAY_STATUS: {
            return {
                ...state,
                playStatus: action.payload.data,
            };
        }
        default:
            return state;
    }
};

export default reducer;
