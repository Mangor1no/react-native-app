import axios from 'axios';
import {
    DOMAIN_API,
    TOP_ALBUM_US_URL,
    TOP_ALBUM_KOREA_URL,
    TOP_ALBUM_VIETNAM_URL,
} from './apiConfig';

const getTopAlbumUS = async () => {
    let data;
    await axios.get(DOMAIN_API + TOP_ALBUM_US_URL).then((res) => {
        if (res && res.data) {
            data = res.data;
        } else {
            data = null;
        }
    });
    return data;
};
const getTopAlbumVietnam = async () => {
    let data;
    await axios.get(DOMAIN_API + TOP_ALBUM_VIETNAM_URL).then((res) => {
        if (res && res.data) {
            data = res.data;
        } else {
            data = null;
        }
    });
    return data;
};
const getTopAlbumKorea = async () => {
    let data;
    await axios.get(DOMAIN_API + TOP_ALBUM_KOREA_URL).then((res) => {
        if (res && res.data) {
            data = res.data;
        } else {
            data = null;
        }
    });
    return data;
};

export {getTopAlbumUS, getTopAlbumVietnam, getTopAlbumKorea};
