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

		if (pageStatus.isFetched) return this.renderIdlePage();

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
				return this.renderIdlePage();
		}
	}

	/**
	 * 渲染业务页面，并传递当前AppContainer 是否正在加载
	 * @returns {*}
	 */
	renderIdlePage() {
		const { pageStatus, children } = this.props;
		return React.Children.map(children, (child) => {
			if (!child) return;

			return (
				React.cloneElement(child, {
					children: child.props.children,
					isParentLoading: pageStatus.code === 1
				}))
		})
	}

	render() {
		const {
			titleBarConfig={},
			showTitleBar,
			isImmersive
		} = this.props;

		return (
			<View style={[styles.container, this.props.style]}>
				{
					showTitleBar ?
						<TitleBar
							title={titleBarConfig.title}
							onLeftBtnClick={titleBarConfig.onLeftBtnClick}
							back={titleBarConfig.back}
							isImmersive={isImmersive}
						/>
						: null
				}
				{this.renderPage()}
			</View>
		)
	}
}

AppContainer.PropTypes = {
	pageStatus: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	showTitleBar: PropTypes.bool
};

AppContainer.defaultProps = {
	showTitleBar: true
};

export default AppContainer;
