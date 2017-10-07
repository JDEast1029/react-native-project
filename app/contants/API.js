/**
 * 网络请求接口
 */
import homeApi from './api/home';
import listApi from './api/list';

const API = {
	...homeApi,
	...listApi
};

export default API;