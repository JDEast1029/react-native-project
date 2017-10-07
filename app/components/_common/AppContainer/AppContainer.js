/**
 * App 页面顶层组件
 */
import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

//组件
import NetError from './PageStatus/NetError';
import SystemError from './PageStatus/SystemError';
import PageLoading from './PageStatus/PageLoading';
import TitleBar from '../TitleBar/TitleBar';
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
	SYSTEM_ERROR: 3
};

class AppContainer extends Component {

	renderPage() {
		const { pageStatus } = this.props;

		if (pageStatus.isFetched) return this.props.children;

		switch (pageStatus.code) {
			case PageStatus.NET_ERROR:
				return (
					<NetError
						onRefresh={this.props.onRefresh}
					/>
				);
			case PageStatus.SYSTEM_ERROR:
				return (
					<SystemError
						onRefresh={this.props.onRefresh}
					/>
				);
			case PageStatus.PAGE_LOADING:
				return (
					<PageLoading />
				);
			default:
				return (this.props.children)
		}
	}

	render() {
		const {
			titleBarConfig={}
		} = this.props;

		return (
			<View style={[styles.container, this.props.style]}>
				<TitleBar
					title={titleBarConfig.title}
					onLeftBtnClick={titleBarConfig.onLeftBtnClick}
					back={titleBarConfig.back}
				/>
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