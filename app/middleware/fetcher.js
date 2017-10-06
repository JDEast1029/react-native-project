/**
 * 网络请求中间件
 */
import {Platform} from 'react-native'
import {Toast} from 'antd-mobile';
import API from '../contants/API';

// API版本号
export const API_VERSION = '1.0';

// 服务器地址
export const APP_SERVER = __DEV__ ? 'http://api.md.weiyian.com/' : 'http://api.weiyianmd.com/';

const fetcher = (store) => (next) => (action) => {
	let {busyName, params, onSuccess, onFailed} = action;

	let formData = new FormData();

	if (!API[busyName]) {
		return next(action);
	}

	let url = APP_SERVER + API[busyName];//请求的绝对地址

	for (let key in params) {
		if (key !== 'pageLoading') {
			formData.append(key, params[key])
		}
	}

	if (formData._parts.length === 0) {
		formData.append('okHttpError', '-1')
	}

	//开发模式下打印url
	if (__DEV__) {
		console.log(url)
	}

	//loading
	if (!!params.pageLoading) {
		store.dispatch({
			type: busyName + '_LOADING',
			code: 1,
		});
	} else {
		Toast.loading(null, 0)
	}

	post(url, formData)
		.then((data) => {
			Toast.hide();
			store.dispatch({
				type: busyName + '_SUCCESS',
				data
			});
			onSuccess && onSuccess()
		})
		.catch((err) => {
			Toast.hide();
			if (err.code !== -1) {
				store.dispatch({
					type: busyName + '_ERROR',
					code: err.code,
					msg: err.msg
				});
			} else {
				//TODO 登录失效
			}
			onFailed && onFailed(err);
		})
};

const post = (url, body) => {

	return new Promise((resolve, reject) => {
		fetch(url, {
			method: "POST",
			headers: {
				'Content-Type': 'multipart/form-data',
				'platform': Platform.OS,
				'version': API_VERSION
			},
			body: body
		}).then((response) => response.text()).then((responseText) => {
			const res = JSON.parse(responseText);
			if (res.status === -1) {
				reject({
					msg: '登录失效',
					code: res.status
				})
			} else {
				res.status
					? resolve(res.data)
					: reject({msg: res, code: 3});
			}
		}).catch((err) => {
			reject({
				msg: "网络错误",
				code: 2
			});
		})
	})
};

export default fetcher;
