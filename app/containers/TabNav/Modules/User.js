import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Image, StyleSheet} from 'react-native';
import { NavigationActions } from "react-navigation";
import { Toast } from 'antd-mobile';
import { HEIGHT_SCALE, WIDTH_SCALE } from '../../../common/AppConst';
import Svg from '../../../components/_common/Svg/Svg'
import Button from '../../../components/_common/Button/Button';

class User extends React.Component {
	static navigationOptions = {
		tabBarLabel: '我',
		tabBarIcon: ({tintColor}) => (
			<Svg
				icon="ic-tab-user"
				size={40 * WIDTH_SCALE}
				color={tintColor}
			/>
		),
	};

	render() {

		return (
			<View>
				<Text>用户中心</Text>
				<Button content='BUTTON' />
			</View>
		);
	}
}

const styles = StyleSheet.create({

});

const mapStateToProps = (state) => ({
	nav: state.navReducer
});

export default connect(mapStateToProps)(User);