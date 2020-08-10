import {combineReducers} from 'redux';
import albums from './albums';
import navigate from './navigate';
import singers from './singers';

export default combineReducers({albums, navigate, singers});
