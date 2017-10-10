/**
 * Reducer 工具集合
 */
export const initPageStatus = () => {
	return {
		pageStatus: {
			code: 1,
			isFetched: false,
		},
	}
};

export const changePageStatus = (state, {code, isFetched}) => {
	if (state.hasOwnProperty('pageStatus')) {
		return {
			pageStatus: {
				...state.pageStatus,
				code: code !== undefined ? code : state.pageStatus.code,
				isFetched: isFetched !== undefined ? isFetched : state.pageStatus.isFetched
			}
		}
	}
};
