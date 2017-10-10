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
	let pageStatus;
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
				...changePageStatus(state, {code: 1}),
				status: action.refreshState || 0
			};
			return state;
		case Types.LIST_TEST_POST + '_SUCCESS':
			state = {
				...state,
				...changePageStatus(state, {code: 0, isFetched: true}),    //isFetched   页面是否已经请求过，如果为true，则不会显示NetError/SystemError页面
				list: [...state.list, ...action.data],
				status: 0               //根据数据isEnd判断
			};
			return state;
		case Types.LIST_TEST_POST + '_ERROR':
			pageStatus = action.refreshState === 1 ? {code: action.code, isFetched: false} : {code: action.code};
			state = {
				...state,
				...changePageStatus(state, pageStatus),
				status: 4
			};
			return state;
		case Types.LIST_TEST_POST + '_REFRESH':
			state = {
				...state,
				...changePageStatus(state, {code: 0, isFetched: true}),
				list: action.data,
				status: 0               //根据数据isEnd判断
			};
			return state;
		default:
			return state;
	}
};

export default listReducer;
