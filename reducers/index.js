import {combineReducers} from 'redux';
import albums from './albums';
import navigate from './navigate';
import singers from './singers';
import single from './single';
import player from './player';

export default combineReducers({albums, navigate, singers, single, player});
