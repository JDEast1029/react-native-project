/**
 * 根路由
 */
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import navReducer from './navReducer';
import homeReducer from './homeReducer';
import listReducer from './listReducer';

const rootReducer = combineReducers({
    navReducer,
    loginReducer,
	homeReducer,
	listReducer,
});

export default rootReducer;