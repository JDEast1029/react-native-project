/**
 * 主页Reducer
 */
import * as Types from '../contants/actions/home';

const initState = {
	pageStatus: {
		code: 1
	},
};

const homeReducer = (state = initState, action) => {
	switch(action.type) {
		case Types.HOME_LIST_POST + '_LOADING':
			state = {
				...state,
				pageStatus: {
					code: action.code
				}
			};
			return state;
		case Types.HOME_LIST_POST + '_ERROR':
			state = {
				...state,
				pageStatus: {
					code: action.code,
					msg: action.msg
				}
			};
			return state;
		default:
			return state;
	}
};

export default homeReducer;