import {TabNavigator, NavigationActions} from "react-navigation"
import AppNavigator from '../AppNavigator.js';

const defaultStateAction = AppNavigator.router.getStateForAction;
AppNavigator.router.getStateForAction = (action,state) => {
	/**
	 * 处理android物理返回键
	 */
	if(state && action.type === 'ANDROID_BACK' && state.routes.length > 1) {
		const routes = [...state.routes];
		routes.pop();
		return {
			...state,
			routes: routes,
			index: routes.length - 1,
		};
	}
	return defaultStateAction(action,state);
};

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams());

const navReducer = (state = initialState, action) => {
	let nextState = AppNavigator.router.getStateForAction(action, state);
	switch (action.type) {
		default:
			return nextState || state;

	}
};

export default navReducer;