/**
 * 网络请求中间件
 */
import {Platform} from 'react-native'
import {Toast} from 'antd-mobile';
import API from '../contants/API';

// API版本号
export const API_VERSION = '1.0';
export const TOKEN = '853e745705cf40359434e4325178324d';

// 服务器地址
export const APP_SERVER = __DEV__ ? 'http://localhost:8081' : 'http://api.weiyianmd.com/';

const fetcher = (store) => (next) => (action) => {
	let {type, params, onSuccess, onFailed, refreshState} = action;

	let formData = new FormData();

	//整个页面的Loading
	if (type === 'PAGE_LOADING') {
		return next({
			type: type,
			code: 1,
		})
	}

	if (!API[type]) {
		return next(action);
	}

	let url = APP_SERVER + API[type];//请求的绝对地址

	for (let key in params) {
		formData.append(key, params[key])
	}
	// formData.append('key', TOKEN);

	//开发模式下打印url
	if (__DEV__) {
		console.log(url)
	}

	//loading
	if (params.loading) {
		Toast.loading(null, 0)
	} else {
		next({
			type: type + '_ON',
			refreshState: refreshState
		});
	}

	post(url, formData)
		.then((data) => {
			Toast.hide();
			onSuccess && onSuccess();
			if (refreshState === 1) {
				next({
					type: type + '_REFRESH',
					data
				});
			} else {
				next({
					type: type + '_SUCCESS',
					data
				});
			}
		})
		.catch((err) => {
			Toast.hide();
			onFailed && onFailed(err);
			switch (err.code) {
				case -1:
					//TODO 登录失效
					break;
				case 2:
				case 3:
					//2、3为网络和系统错误，需要更新页面
					next({
						type: type + '_ERROR',
						code: err.code,
						msg: err.msg,
						refreshState: refreshState
					});
					break;
				default:
					next({
						type: type + '_ERROR',
						code: 0
					});
					break;
			}
		});
};

const post = (url, body) => {
	return new Promise((resolve, reject) => {
		fetch(url, {
			// method: 'POST',
			headers:{
				'Accept': 'application/json',
				'Content-Type':'application/json',
				// 'Content-Type': 'multipart/form-data',
				// 'platform': Platform.OS,
				// 'version': API_VERSION
			},
			// body: body
		})
		.then((response) => response.text()).then((responseText) => {
			try {
				const res = JSON.parse(responseText);
				if (res.status === -1) {
					reject({
						msg: '登录失效',
						code: res.status
					})
				} else {
					res.status
						? resolve(res.data)
						: reject({msg: res, code: 4}); //code: 4 Toast显示错误
				}
			} catch(err) {
				reject({
					msg: "系统异常",
					code: 3
				});
			}
		}).catch((err) => {
			reject({
				msg: "网络异常",
				code: 2
			});
		})
	})
};

export default fetcher;
