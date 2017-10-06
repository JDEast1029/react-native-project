/**
 * 顶层组件样式
 */
import { StyleSheet } from 'react-native';
import { APP_BG_COLOR, HEIGHT_SCALE, GRAY_COLOR, WIDTH_SCALE } from '../../../common/AppConst';

const styles = StyleSheet.create({
	container: {
		backgroundColor: APP_BG_COLOR,
		flex: 1
	},

	error404: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: -20 * HEIGHT_SCALE,
	},

	errorText404: {
		color: GRAY_COLOR,
		fontSize: 32 * WIDTH_SCALE,
		marginTop: 20 * HEIGHT_SCALE
	}
});

export default styles;