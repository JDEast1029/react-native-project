/**
 * 进入页面时显示加载页面
 */
import * as Types from '../../contants/actions/_common/loading';

export const loading = () => {
	return {
		type: Types.PAGE_LOADING
	}
};
