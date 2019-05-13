import { combineReducers } from 'redux';
import leads from '../coomponents/leads/leads';
import errors from './errors';

export default combineReducers({
    errors,
    leads
});