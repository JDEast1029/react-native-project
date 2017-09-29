/**
 * 按钮
 */
import React from 'react';
import {
	TouchableOpacity,
	StyleSheet
} from 'react-native';

//常量
import { MAIN_COLOR, WIDTH_SCALE } from '../../../common/AppConst';

const Button = (props) => {

	return (
		<TouchableOpacity
			activeOpacity={0.6}
			style={[styles.button, {...props.styles}]}
			onPress={props.onPress}
		>
			{props.text}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: MAIN_COLOR,
		borderRadius: 4 * WIDTH_SCALE
	}
});

Button.displayName = 'appButton';

export default Button;
