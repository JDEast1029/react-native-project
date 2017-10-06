/**
 * 根路由
 */
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import navReducer from './navReducer';
import homeReducer from './homeReducer';

const rootReducer = combineReducers({
    navReducer,
    loginReducer,
	homeReducer
});

export default rootReducer;