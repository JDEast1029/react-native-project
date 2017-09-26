/**
 * 网络请求Actions
 */

export default request = (type, params, data, onSuccess, onFailed) => {
	return {
		busyName: type,
		params,             //请求配置参数
		data,               //请求数据
		onSuccess,
		onFailed
	}
}
