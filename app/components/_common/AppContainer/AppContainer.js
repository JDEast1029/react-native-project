/**
 * App 页面顶层组件
 */
import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';

import Svg from '../../../components/_common/Svg/Svg';
import { HEIGHT_SCALE, WIDTH_SCALE, GRAY_COLOR, MAIN_COLOR } from '../../../common/AppConst';
//样式
import styles from './AppContainerStyle';

/**
 * 页面状态
 * @type {{IDLE: number, PAGE_LOADING: number, NET_ERROR: number, SERVER_ERROR: number}}
 */
const PageStatus = {
	IDLE: 0,
	PAGE_LOADING: 1,
	NET_ERROR: 2,
	SERVER_ERROR: 3
};

class AppContainer extends Component {

	renderPage() {
		const { pageStatus } = this.props;
		switch (pageStatus) {
			case PageStatus.NET_ERROR:
				return (
					<TouchableWithoutFeedback
						onPress={this.props.onRefresh}
					>
						<View style={styles.error404}>
							<Svg
								icon="ic-404-error"
								size={280 * WIDTH_SCALE}
								color={GRAY_COLOR}
							/>
							<Text style={styles.errorText404}>网络异常，请点击刷新</Text>
						</View>
					</TouchableWithoutFeedback>
				);
			case PageStatus.SERVER_ERROR:
				return (
					<View></View>
				);
			case PageStatus.PAGE_LOADING:
				return (
					<View>

					</View>
				);
			default:
				return (this.props.children)
		}
	}

	render() {
		return (
			<View style={[styles.container, this.props.style]}>
				{this.renderPage()}
			</View>
		)
	}
}

AppContainer.PropTypes = {
	pageStatus: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	])
};

export default AppContainer;