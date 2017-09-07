/**
 * ---------  Tip  -----------
 * getActionForPathAndParams()参数为空时，默认去routerConfig中的第一个路由
 */
import {TabNavigator, NavigationActions} from "react-navigation"
import AppNavigator from '../router/routes.js';

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams());

const navReducer = (state = initialState, action) => {
	let nextState = AppNavigator.router.getStateForAction(action, state);
	switch (action.type) {
		default:
			return nextState || state;

	}
};

export default navReducer;