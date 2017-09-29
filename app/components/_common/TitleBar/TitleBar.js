/**
 * 顶部标题栏
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Text,
	View,
	TouchableOpacity,
	Platform,
	Dimensions,
} from 'react-native';
import Icon from '../../../common/icon/iconFont';
import styles from './Styles';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const WIDTH_SCALE = WINDOW_WIDTH / 750;
const HEIGHT_SCALE = WINDOW_HEIGHT / 1334;

const beforeLollipop = Platform.OS === 'android' && Platform.Version < 21;

class TitleBar extends Component {
	static propTypes = {
		title: PropTypes.string,                      //页面标题
		onLeftBtnClick: PropTypes.func,                       //回退键方法
		back: PropTypes.bool,                         //是否显示默认的返回键
	};

	static defaultProps = {
		title: 'Title',
		onLeftBtnClick: () => {}
	};

	constructor(props) {
		super(props);
	}

	getSpecifyBtn(type) {
		const { children } = this.props;
		let button = null;
		React.Children.map(children, (child) => {
			if (!child) return;
			if (child.props['btn-type'] === type) {
				button = child;
			}
		});
		return button;
	}

	/**
	 * 渲染左侧按钮
	 * @returns {XML}
	 */
	renderLeftBtn() {
		const leftBtn = (               //默认的leftButton
			<TouchableOpacity
				style={{
					width: 100 * WIDTH_SCALE,
					alignItems: 'flex-start',
					height: 100 * HEIGHT_SCALE,
					justifyContent: 'center'
				}}
				activeOpacity={0.6}
				onPress={() => this.props.onLeftBtnClick()}
			>
				<Text style={{
					fontFamily: 'icomoon',
					color: '#666',
					fontSize: 40 * HEIGHT_SCALE,
					marginLeft: 10 * WIDTH_SCALE
				}}
				>
					{Icon('ic-left-arrow')}
				</Text>
			</TouchableOpacity>
		);
		let customBtn = this.getSpecifyBtn('left');
		if (!customBtn) {
			return leftBtn;
		} else {
			return React.cloneElement(customBtn);
		}
	}

	/**
	 * 渲染右侧按钮
	 * @returns {XML}
	 */
	renderRightBtn() {
		const rightBtn = null;  //默认的rightButton
		let customBtn = this.getSpecifyBtn('right');
		if (!customBtn) {
			return rightBtn;
		} else {
			return React.cloneElement(customBtn);
		}
	}

    render() {
		const {
			style,
			title,
			titleStyle,
			back
		} = this.props;

        return (
			<View style={[styles.container, style]}>
				{
					back ?
						<View style={styles.leftBtn}>
							{this.renderLeftBtn()}
						</View>
						: null
				}

				<Text style={[styles.title, titleStyle]}>{title}</Text>

				<View style={styles.rightBtn}>
					{this.renderRightBtn()}
				</View>
			</View>
        )
    }
}

export default TitleBar;

