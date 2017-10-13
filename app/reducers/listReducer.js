/**
 * 列表
 */
import * as Types from '../contants/actions/list';
import { initPageStatus, changePageStatus } from './_common/utils';

const initialState = {
	...initPageStatus(),
	list: [],
	status: 0,
	totalCount: 0,
	currentPage: 1,
};

const listReducer = (state = initialState, action) => {
	switch(action.type) {
		case Types.PAGE_LOADING:
			state = {
				...state,
				...changePageStatus(state, {code: action.code})
			};
			return state;
		case Types.LIST_TEST_POST + '_ON':            //上拉加载\刷新
			state = {
				...state,
				...changePageStatus(state, {code: state.list.length > 0 ? 0 : 1}),
				status: action.refreshState || 0
			};
			return state;
		case Types.LIST_TEST_POST + '_SUCCESS':
			state = {
				...state,
				...changePageStatus(state, {code: 0}),
				list: [...state.list, ...action.data],
				status: 0               //根据数据isEnd判断
			};
			return state;
		case Types.LIST_TEST_POST + '_ERROR':
			state = {
				...state,
				...changePageStatus(state, {code: action.code}),
				list: action.refreshState === 1 ? [] : state.list,
				status: 4
			};
			return state;
		case Types.LIST_TEST_POST + '_REFRESH':
			state = {
				...state,
				...changePageStatus(state, {code: 0}),
				list: action.data,
				status: 0               //根据数据isEnd判断
			};
			return state;
		default:
			return state;
	}
};

export default listReducer;
