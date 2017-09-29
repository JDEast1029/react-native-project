/**
 * 按钮
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	TouchableOpacity,
	StyleSheet,
	Text
} from 'react-native';

//常量
import { MAIN_COLOR, WIDTH_SCALE, HEIGHT_SCALE } from '../../../common/AppConst';

class Button extends PureComponent {

	renderContent() {
		const { content } = this.props;
		if (typeof content === 'string') {
			return (
				<Text style={styles.content}>
					{content}
				</Text>
			)
		}
		return content;
	}

	render() {
		const { style, onPress } = this.props;
		return (
			<TouchableOpacity
				activeOpacity={0.6}
				style={[styles.button, {...style}]}
				onPress={onPress}
			>
				{this.renderContent()}
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: MAIN_COLOR,
		borderRadius: 8 * WIDTH_SCALE,
		paddingTop: 10 * HEIGHT_SCALE,
		paddingBottom: 10 * HEIGHT_SCALE,
		alignItems: 'center',
		width: 200 * WIDTH_SCALE
	},
	content: {
		color: '#fff',
		fontSize: 24 * WIDTH_SCALE
	}
});

Button.propTypes = {
	content: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

Button.displayName = 'appButton';

export default Button;
