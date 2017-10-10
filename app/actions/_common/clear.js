/**
 * 退出页面清空数据
 */
import * as Types from '../../contants/actions/_common/clear';

export const clear = () => {
	return {
		type: Types.CLEAR_DATA
	}
};
