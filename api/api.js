import axios from 'axios';
import {
    DOMAIN_API,
    TOP_ALBUM_US_URL,
    TOP_ALBUM_KOREA_URL,
    TOP_ALBUM_VIETNAM_URL,
    ALBUM_FOR_NEW_DAY_URL,
    TOP_SINGERS_URL,
    TOP_ALBUM_US_RAP_HIPHOP_URL,
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

const getAlbumForNewDay = async () => {
    let data;
    await axios.get(DOMAIN_API + ALBUM_FOR_NEW_DAY_URL).then((res) => {
        if (res && res.data) {
            data = res.data;
        } else {
            data = null;
        }
    });
    return data;
};

const getTopSingers = async () => {
    let data;
    await axios.get(DOMAIN_API + TOP_SINGERS_URL).then((res) => {
        if (res && res.data) {
            data = res.data;
        } else {
            data = null;
        }
    });
    return data;
};

const getTopAlbumUSRapHiphop = async () => {
    let data;
    await axios.get(DOMAIN_API + TOP_ALBUM_US_RAP_HIPHOP_URL).then((res) => {
        if (res && res.data) {
            data = res.data;
        } else {
            data = null;
        }
    });
    return data;
};

export {
    getTopAlbumUS,
    getTopAlbumVietnam,
    getTopAlbumKorea,
    getAlbumForNewDay,
    getTopSingers,
    getTopAlbumUSRapHiphop,
};
