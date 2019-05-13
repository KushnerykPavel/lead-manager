import { combineReducers } from 'redux';
import leads from '../coomponents/leads/leads';
import errors from './errors';
import messages from './messages';

export default combineReducers({
    messages,
    errors,
    leads
});