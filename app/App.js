import React from 'react';
import {connect} from 'react-redux';
import {addNavigationHelpers, NavigationActions} from 'react-navigation';
import {Text, BackHandler} from 'react-native';
import { Toast } from 'antd-mobile';
import AppNavigator from './router/routes';

/**
 * ----------  Tip  ------------
 * 官方文档说createNavigationContainer可以用来监听android的返回键，部分源码：
 *  this.subs = BackAndroid.addEventListener('backPress', () =>
 *		this.dispatch(NavigationActions.back())
 *	);
 * BackAndroid是其自定义的对象，并不能监听android的物理返回键
 * 现用如下方式进行监听
 */

class App extends React.Component {

	componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
	}

	onBackPress = () => {
		const { dispatch, nav } = this.props;
		if (nav.index === 0) {
			let now = new Date().getTime();

			if(now - this.lastBackPressed < 3000) {
				return false;
			}
			this.lastBackPressed = now;
			Toast.info('再点击一次退出应用', 3);
			return true;
		}
		dispatch(NavigationActions.back());
		return true;
	};

	render() {
		return (
			<AppNavigator
				navigation={addNavigationHelpers({
					dispatch: this.props.dispatch,
					state: this.props.nav
				})}
			/>
		);
	}
}

const mapStateToProps = (state) => ({
	nav: state.navReducer
});

export default connect(mapStateToProps)(App);