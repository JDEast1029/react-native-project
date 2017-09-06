import React from 'react';
import {connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import {Text, BackHandler} from 'react-native';
import AppNavigator from './AppNavigator';

class App extends React.Component {
	componentWillMount(){
		BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid );
	}


	componentWillUnmount(){
		BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
	}

	_onBackAndroid=()=>{
		if (this.props.nav.routes && this.props.nav.routes.length > 1) {
			let routes = [...this.props.nav.routes];
			routes.pop();
			this.props.dispatch({type: 'ANDROID_BACK'});
			return true;
		} else if (this.props.nav.routes && this.props.nav.routes.length === 1) {

			let now = new Date().getTime();

			if(now - this.lastBackPressed < 2500) {
				return false;
			}
			this.lastBackPressed = now;
			console.log('再点击一次退出应用');
			return true;
		}
		return false;
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