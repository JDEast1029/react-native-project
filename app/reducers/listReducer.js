/**
 * 列表
 */
import * as Types from '../contants/actions/list';

const initialState = {
	pageStatus: {
		code: 1,
		isFetched: false,
	},
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
				pageStatus: {
					...state.pageStatus,
					code: action.code
				}
			};
			return state;
		case Types.LIST_TEST_POST + '_ON':            //上拉加载
			state = {
				...state,
				pageStatus: {
					...state.pageStatus,
					code: 1,
				},
				status: 2
			};
			return state;
		case Types.LIST_TEST_POST + '_SUCCESS':
			state = {
				...state,
				list: [...state.list, ...action.data],
				pageStatus: {
					...state.pageStatus,
					code: 0,
					isFetched: true
				},
				status: 0               //根据数据isEnd判断
			};
			return state;
		case Types.LIST_TEST_POST + '_ERROR':
			state = {
				...state,
				pageStatus: {
					...state.pageStatus,
					code: action.code,
					msg: action.msg
				},
				status: 4
			};
			return state;
		case Types.LIST_TEST_POST + '_REFRESH':
			state = {
				...state,
				list: action.data,
				status: 0               //根据数据isEnd判断
			};
			return state;
		default:
			return initialState;
	}
};

export default listReducer;
