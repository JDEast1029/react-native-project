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

	errorContainer: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 200 * HEIGHT_SCALE,
	},

	errorText: {
		color: GRAY_COLOR,
		fontSize: 32 * WIDTH_SCALE,
		marginTop: 20 * HEIGHT_SCALE
	}
});

export default styles;