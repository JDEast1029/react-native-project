/**
 * 路由栈配置
 */
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

const stackConfig = {
	headerMode: 'none',                                                         //取消默认标题栏
	transitionConfig: () => {
		return {screenInterpolator: CardStackStyleInterpolator.forHorizontal}   //navigator水平切换
	}
};

export default stackConfig;
