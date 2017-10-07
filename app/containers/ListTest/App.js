/**
 * 列表测试
 */
import React from 'react';
import {View, Text, StyleSheet, InteractionManager} from 'react-native';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/list';
import * as Types from '../../contants/actions/list';
//业务组件、常量
import AppContainer from '../../components/_common/AppContainer/AppContainer';
import RefreshListView  from '../../components/_common/RefreshListView/RefreshListView';
import {HEIGHT_SCALE, WIDTH_SCALE} from '../../common/AppConst';

class App extends React.Component {
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
				type: Types.LIST_TEST_POST,
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
		const { listReducer, navigation } = this.props;
		const { goBack } = navigation;

		return (
			<AppContainer
				style={{flex: 1}}
				pageStatus={listReducer.pageStatus.code}
				onRefresh={this.fetchData}
				titleBarConfig={{
					title: '列表',
					back: true,
					onLeftBtnClick: goBack
				}}
			>

				<RefreshListView
					data={this.state.data}
					isParentLoading={listReducer.pageStatus.code === 1}
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
	listReducer: state.listReducer,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
	actions: bindActionCreators(Actions, dispatch)
});


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
