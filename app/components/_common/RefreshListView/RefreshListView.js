/**
 * 滑动列表
 * ---------------------  使用介绍  ----------------------------------------
 * keyExtractor = (item, index) => {
 * 		return item.index;
 * };
 * <RefreshListView
 *		data={this.state.data}
 *		keyExtractor={this.keyExtractor}           //来替代item中的key
 *		renderItem={this.renderItem}
 *	/>
 *--------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator,
	RefreshControl
} from 'react-native';
import PropTypes from 'prop-types';
import Svg from '../../../components/_common/Svg/Svg';
import { HEIGHT_SCALE, WIDTH_SCALE, GRAY_COLOR, MAIN_COLOR } from '../../../common/AppConst';

const RefreshState = {
	Idle: 0,
	HeaderRefreshing: 1,
	FooterRefreshing: 2,
	NoMoreData: 3,
	Failure: 4,
};

const footerRefreshingText = '数据加载中…';
const footerFailureText = '点击重新加载';
const footerNoMoreDataText = '已加载全部数据';

class RefreshListView  extends Component {
	constructor(props){
		super(props);
		this.onHeaderRefresh             = this.onHeaderRefresh.bind(this);
		this.onEndReached                = this.onEndReached.bind(this);
		this.shouldStartHeaderRefreshing = this.shouldStartHeaderRefreshing.bind(this);
		this.shouldStartFooterRefreshing = this.shouldStartFooterRefreshing.bind(this);
	}

	onHeaderRefresh() {
		if (this.shouldStartHeaderRefreshing()) {
			this.props.onHeaderRefresh && this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
		}
	}

	onEndReached() {
		if (this.shouldStartFooterRefreshing()) {
			this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
		}
	}

	shouldStartHeaderRefreshing() {
		return !(
			this.props.refreshState === RefreshState.HeaderRefreshing
			|| this.props.refreshState === RefreshState.FooterRefreshing
		);
	}

	shouldStartFooterRefreshing() {
		let {refreshState, data} = this.props;
		if (data.length === 0) {
			return false
		}

		return (refreshState === RefreshState.Idle)
	}

	/**
	 * list 底部
	 * @returns {*}
	 */
	renderFooter = () => {
		let footer = null;

		let footerContainerStyle = [styles.footerContainer, this.props.footerContainerStyle];
		let footerTextStyle = [styles.footerText, this.props.footerTextStyle];
		switch (this.props.refreshState) {
			case RefreshState.Idle:
				footer = (<View style={footerContainerStyle} />);
				break;
			case RefreshState.Failure: {
				footer = (
					<TouchableOpacity
						style={footerContainerStyle}
						onPress={() => {
							this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
						}}
					>
						<Text style={footerTextStyle}>{footerFailureText}</Text>
					</TouchableOpacity>
				);
				break
			}
			case RefreshState.FooterRefreshing: {
				footer = (
					<View style={footerContainerStyle} >
						<ActivityIndicator size="small" color="#888888" />
						<Text style={[footerTextStyle, {marginLeft: 7}]}>{footerRefreshingText}</Text>
					</View>
				);
				break
			}
			case RefreshState.NoMoreData: {
				footer = (
					<View style={footerContainerStyle} >
						<Text style={footerTextStyle}>{footerNoMoreDataText}</Text>
					</View>
				);
				break
			}
		}

		return footer
	};

	/**
	 * 数据为空显示页面
	 * @returns {XML}
	 */
	renderEmpty = () =>  {
		return (
			<View style={styles.emptyContainer}>
				<Svg
					icon="ic-empty"
					size={350 * WIDTH_SCALE}
					color={GRAY_COLOR}
				/>
				<Text style={styles.emptyText}>暂无数据</Text>
			</View>
		)
	};

	render() {
		if (this.props.data.length <= 0) {
			return this.renderEmpty();
		}

		return (
			<FlatList
				onEndReached={this.onEndReached}
				// onRefresh={this.onHeaderRefresh}                                         使用FlatList暴露的下拉属性无法改变指示器的颜色，
				// refreshing={this.props.refreshState === RefreshState.HeaderRefreshing}   现在使用ScrollView的refreshControl属性
				ListFooterComponent={this.renderFooter}
				initialNumToRender={20}
				removeClippedSubviews={false}
				refreshControl={
					<RefreshControl
						refreshing={this.props.refreshState === RefreshState.HeaderRefreshing}
						onRefresh={this.onHeaderRefresh}
						colors={[MAIN_COLOR]}
					/>
				}
				{...this.props}
			/>
		)
	}
}

const styles = StyleSheet.create({
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: -20 * HEIGHT_SCALE
	},

	emptyText: {
		color: GRAY_COLOR,
		fontSize: 38 * WIDTH_SCALE,
		marginTop: 20 * HEIGHT_SCALE
	},

	footerContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		height: 44,
	},

	footerText: {
		fontSize: 14,
		color: '#555555'
	}
});

RefreshListView .propTypes = {
	data: PropTypes.array,
	refreshState: PropTypes.number,
	footerContainerStyle: PropTypes.object,
	footerTextStyle: PropTypes.object,
	onHeaderRefresh: PropTypes.func,
	onFooterRefresh: PropTypes.func,
};

RefreshListView .defaultProps = {
	data: [],
	onHeaderRefresh: () => {},
	onFooterRefresh: () => {},
};

export default RefreshListView ;
