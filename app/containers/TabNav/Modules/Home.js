import React from 'react';
import {View, Text, Button, Image, StyleSheet, InteractionManager} from 'react-native';
import {NavigationActions} from "react-navigation";
import {Toast} from 'antd-mobile';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../../actions/home';
import * as Types from '../../../contants/actions/home';
//业务组件、常量
import AppContainer from '../../../components/_common/AppContainer/AppContainer';
import Svg from '../../../components/_common/Svg/Svg'
import RefreshListView  from '../../../components/_common/RefreshListView/RefreshListView';
import {HEIGHT_SCALE, WIDTH_SCALE} from '../../../common/AppConst';

class Home extends React.Component {
	static navigationOptions = {
		tabBarLabel: '主页',
		// Note: By default the icon is only shown on iOS. Search the showIcon option
		// below.
		tabBarIcon: ({tintColor, focused}) => (
			<Svg
				icon="ic-tab-home"
				size={40 * WIDTH_SCALE}
				color={tintColor}
			/>
		),
	};

	constructor(props){
		super(props);
		this.state = {
			data: []
		}
	}

	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			// ...耗时较长的同步的任务...
			this.fetchData();

		});
	}

	fetchData = () => {
		this.props.actions.request(
			{
				type: Types.HOME_LIST_POST,
				params: {pageLoading: true},
				onSuccess: (res) => {},
				onFailed: (err) => {}
			}
		)
	};

	/**
	 * keyExtractor属性指定使用id作为列表每一项的key。
	 * @param item
	 * @param index
	 */
	keyExtractor = (item, index) => {
		return item.index;
	};

	renderItem = ({item}) => {
		return (
			<View style={{height: 50}}><Text>{item.name}</Text></View>
		)
	};

	render() {
		const { homeReducer } = this.props;

		return (
			<AppContainer
				style={{flex: 1}}
				pageStatus={homeReducer.pageStatus.code}
				onRefresh={this.fetchData}
			>
				<Text>主页</Text>
				<RefreshListView
					data={this.state.data}
					isParentLoading={homeReducer.pageStatus.code === 1}
					keyExtractor={this.keyExtractor}           //来替代item中的key
					renderItem={this.renderItem}
					getItemLayout={(data,index)=>(
						{length: 50, offset: (50) * index, index}
					)}
				/>
			</AppContainer>
		);
	}
}
const styles = StyleSheet.create({});

const mapStateToProps = (state, ownProps) => ({
	homeReducer: state.homeReducer,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
	actions: bindActionCreators(Actions, dispatch)
});


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);