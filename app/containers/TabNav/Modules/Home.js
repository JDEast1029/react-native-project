import React from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import {NavigationActions} from "react-navigation";
import {Toast} from 'antd-mobile';
import {HEIGHT_SCALE, WIDTH_SCALE} from '../../../common/AppConst';
import Svg from '../../../components/_common/Svg/Svg'

class Home extends React.Component {
	static navigationOptions = {
		tabBarLabel: '主页',
		// Note: By default the icon is only shown on iOS. Search the showIcon option
		// below.
		tabBarIcon: ({tintColor, focused}) => {
			return (
				<Svg
					icon="ic-tab-home"
					size={40 * WIDTH_SCALE}
					color={tintColor}
				/>
			)
		},
	};

	render() {
		return (
			<View>
				<Text>主页</Text>
			</View>
		);
	}
}
const styles = StyleSheet.create({

});

export default Home;