/**
 * TitleBar Style
 */
import { StyleSheet, Dimensions, Platform } from 'react-native';
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const WIDTH_SCALE = WINDOW_WIDTH / 750;
const HEIGHT_SCALE = WINDOW_HEIGHT / 1334;
const beforeLollipop = Platform.OS === 'android' && Platform.Version < 21;

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		top: 0,
		width: WINDOW_WIDTH,
		backgroundColor: '#fff',
		// height: beforeLollipop ? 90 * HEIGHT_SCALE : 130 * HEIGHT_SCALE,
		height: 100 * HEIGHT_SCALE,
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '#c4c4c4',
		// elevation: 2
	},
	title: {
		fontSize: 36 * HEIGHT_SCALE,
		color: '#333'
	},
	leftBtn: {
		position: 'absolute',
		left: 20 * WIDTH_SCALE,
		justifyContent: 'center'
	},
	rightBtn: {
		position: 'absolute',
		right: 20 * WIDTH_SCALE
	},
});

export default styles;
