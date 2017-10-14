/**
 *  Camera
 */
import React, { Component } from 'react';
import {
	View
} from 'react-native';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/list';
//业务组件、常量
import QRScanner from '../../components/_common/QRScanner/QRScanner';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			scan: true
		}
	}

	render() {
		const { navigation, navReducer } = this.props;
		const currentRoute = navReducer.routes[navReducer.routes.length - 1].routeName;

		return (
			<QRScanner
				isScannable={this.state.scan}
				onBarCodeRead={() => { this.setState({scan: false})}}
				vibrate
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	navReducer: state.navReducer,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
	actions: bindActionCreators(Actions, dispatch)
});


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

