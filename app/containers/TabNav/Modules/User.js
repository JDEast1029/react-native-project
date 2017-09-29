import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Image, StyleSheet} from 'react-native';
import { NavigationActions } from "react-navigation";
import { Toast } from 'antd-mobile';
import { HEIGHT_SCALE, WIDTH_SCALE } from '../../../common/AppConst';
import Icon from '../../../common/icon/iconFont';
import Button from '../../../components/_common/Button/Button';

//utils
import { getKeyForRouteName } from '../../../common/utils/navigatorUtils';

class User extends React.Component {
	static navigationOptions = {
		tabBarLabel: '我',
		tabBarIcon: ({tintColor}) => (<Text style={{
			fontFamily: 'icomoon',
			color: tintColor,
			fontSize: 40 * HEIGHT_SCALE
		}}>
			{Icon('ic-tab-user')}
		</Text>),
	};

	render() {

		return (
			<View>
				<Text>用户中心</Text>
				<Button text={<Text>asdfas</Text>} />
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