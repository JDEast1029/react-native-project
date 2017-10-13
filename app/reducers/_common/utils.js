/**
 * Reducer 工具集合
 */
export const initPageStatus = () => {
	return {
		pageStatus: {
			code: 1
		},
	}
};

export const changePageStatus = (state, {code}) => {
	if (state.hasOwnProperty('pageStatus')) {
		return {
			pageStatus: {
				...state.pageStatus,
				code: code !== undefined ? code : state.pageStatus.code
			}
		}
	}
};
