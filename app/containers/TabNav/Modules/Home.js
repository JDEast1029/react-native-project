import React from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import { NavigationActions } from "react-navigation";
import { Toast } from 'antd-mobile';
import { HEIGHT_SCALE, WIDTH_SCALE } from '../../../common/AppConst';
import Icon from '../../../common/icon/iconFont';

class Home extends React.Component {
	static navigationOptions = {
		tabBarLabel: '主页',
		// Note: By default the icon is only shown on iOS. Search the showIcon option
		// below.
		tabBarIcon: ({tintColor}) => (<Text style={{
			fontFamily: 'icomoon',
			color: tintColor,
			fontSize: 40 * HEIGHT_SCALE
		}}>
			{Icon('ic-tab-home')}
		</Text>),
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