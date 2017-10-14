/**
 * 输入框
 */
import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet
} from 'react-native';

import Svg from '../Svg/Svg';
//App常量
import { HEIGHT_SCALE, WIDTH_SCALE, LIGHT_GRAY_COLOR } from '../../../common/AppConst';

class Input extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
			hideValue: props.secureTextEntry
		};
		this.handleOnChangeText = this.handleOnChangeText.bind(this);
	}

	handleOnChangeText(value) {
		this.setState({value});
		this.props.onChange(value)
	}

	renderField() {
		const { field } = this.props;
		if (!React.isValidElement(field)) {
			return <Text>{field}</Text>
		}
		return field;
	}

	/**
	 * 为密码输入类型时 隐藏、显示图标
	 */
	renderPsw() {
		if (this.props.secureTextEntry && !!this.state.value) {
			let icon = this.state.hideValue ? 'ic-show' : 'ic-hide';
			return (
				<Svg
					icon={icon}
					size={40 * WIDTH_SCALE}
					color={LIGHT_GRAY_COLOR}
					style={{marginRight: 10 * WIDTH_SCALE}}
					onPress={() => {this.setState({hideValue: !this.state.hideValue})}}
				/>
			)
		}
	}

	renderClearBtn() {
		if (this.props.editable && !!this.state.value) {
			return (
				<Svg
					icon="ic-clear"
					size={40 * WIDTH_SCALE}
					color={LIGHT_GRAY_COLOR}
					onPress={() => {this.setState({value: ""})}}
				/>
			)
		}
	}

	render() {
		const { containerStyle } = this.props;

		return (
			<View style={[styles.container, containerStyle]}>
				{this.renderField()}

				<TextInput
					ref={(ref) => this.textInput = ref}
					{...this.props}
					style={styles.input}
					underlineColorAndroid="transparent"
					secureTextEntry={this.state.hideValue}
					value={this.state.value}
					onChangeText={this.handleOnChangeText}
				/>

				{this.renderPsw()}

				{this.renderClearBtn()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFF',
		paddingVertical: 10 * HEIGHT_SCALE,
		paddingHorizontal: 20 * WIDTH_SCALE,
		height: 80 * HEIGHT_SCALE
	},
	input: {
		padding: 0,
		flex: 1,
		marginRight: 10 * WIDTH_SCALE
	}
});

Input.propTypes = {
	...TextInput.propTypes
};

Input.defaultProps = {
	...TextInput.defaultProps,
	editable: true,
	secureTextEntry: false
};

export default Input;
