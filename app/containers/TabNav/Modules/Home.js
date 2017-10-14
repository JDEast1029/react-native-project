import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
//业务组件、常量
import Svg from '../../../components/_common/Svg/Svg'
import AppButton from '../../../components/_common/Button/Button';
import {HEIGHT_SCALE, WIDTH_SCALE, GRAY_COLOR} from '../../../common/AppConst';
import ImagePreview from '../../../components/_common/ImagePreview/ImagePreview';

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

	render() {
		const { navigation } = this.props;
		const { navigate } = navigation;

		return (
			<View style={{flex: 1}}>
				<Text>主页</Text>
				<AppButton
					content='go to list'
					onPress={() => navigate('ListTest')}
				/>

				<AppButton
					content='go to image preview'
					onPress={() => navigate('ImagePreview')}
				/>

				<AppButton
					content='go to camera'
					onPress={() => navigate('Camera')}
				/>
				{/*<ImagePreview />*/}
				{/*<Input*/}
					{/*field="Name"*/}
					{/*selectionColor={GRAY_COLOR}*/}
					{/*secureTextEntry={true}*/}
				{/*/>*/}
			</View>
		);
	}
}

const styles = StyleSheet.create({});

export default Home;
