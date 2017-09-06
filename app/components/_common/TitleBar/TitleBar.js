/**
 * 顶部标题栏
 */
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	Platform,
	Dimensions,
} from 'react-native';
// import styles from './Styles';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const WIDTH_SCALE = WINDOW_WIDTH / 750;
const HEIGHT_SCALE = WINDOW_HEIGHT / 1334;

const beforeLollipop = Platform.OS === 'android' && Platform.Version < 21;

class TitleBar extends Component {
	static propTypes = {
		title: React.PropTypes.string,                //页面标题
	};

	static defaultProps = {
		title: 'Title',
	};

	constructor(props) {
		super(props);
	}

	getSpecifyBtn(type) {
		const { children } = this.props;
		let button = null;
		React.Children.map(children, (child) => {
			if (!child) return;
			if (child.props.btn-type === 'left') {
				button = child;
			}
		});
		return button;
	}

	renderLeftButton() {
		const leftBtn = (               //默认的leftButton
			<View>
				<Image/>
			</View>
		);
		let customBtn = this.getSpecifyBtn('left');
		console.log(customBtn, 1)
		if (customBtn) {
			return leftBtn;
		} else {
			return React.cloneElement(customBtn, {
				children: customBtn.props.children,
			})
		}
	}

    render() {
		const {
			style,
			title,
			titleStyle,
			leftButton,
			rightButton
		} = this.props;

        return (
			<View style={[styles.container, style]}>
				{this.renderLeftButton()}
				<Text style={[styles.title, titleStyle]}>{title}</Text>
				{rightButton}
			</View>
        )
    }
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		top: 0,
		width: WINDOW_WIDTH,
		// height: beforeLollipop ? 90 * HEIGHT_SCALE : 130 * HEIGHT_SCALE,
		height: 100 * HEIGHT_SCALE,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	title: {
		fontSize: 36 * HEIGHT_SCALE,
		color: '#333'
	}
});

export default TitleBar;

