/**
 * 网络请求Actions
 */

export const request = ({type, params, onSuccess, onFailed}) => {
	return {
		busyName: type,
		params,             //请求参数
		onSuccess,
		onFailed
	}
};
