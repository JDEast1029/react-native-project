/**
 * 根路由
 */
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import navReducer from './navReducer';

const rootReducer = combineReducers({
    navReducer,
    loginReducer
});

export default rootReducer;