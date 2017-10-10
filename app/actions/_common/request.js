/**
 * 网络请求Actions
 */

export const request = ({type, params, refreshState, onSuccess, onFailed}) => {
	return {
		type,
		params,             //请求参数
		refreshState,
		onSuccess,
		onFailed
	}
};
