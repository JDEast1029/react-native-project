/**
 * 列表
 */
import * as Types from '../contants/actions/list';

const initState = {
	pageStatus: {
		code: 1
	},
};

const listReducer = (state = initState, action) => {
	switch(action.type) {
		case Types.LIST_TEST_POST + '_LOADING':
			state = {
				...state,
				pageStatus: {
					code: action.code
				}
			};
			return state;
		case Types.LIST_TEST_POST + '_ERROR':
			state = {
				...state,
				pageStatus: {
					code: action.code,
					msg: action.msg
				}
			};
			return state;
		default:
			return initState;
	}
};

export default listReducer;
