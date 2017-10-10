/**
 * 页面加载动画
 */
import React, { PureComponent } from 'react';
import {
	View,
	Text,
	ActivityIndicator,
	TouchableWithoutFeedback
} from 'react-native';
import Svg from '../../Svg/Svg';
import { WIDTH_SCALE, GRAY_COLOR, HEIGHT_SCALE, LIGHT_GRAY_COLOR } from '../../../../common/AppConst';
import styles from '../AppContainerStyle';

class PageLoading extends PureComponent {

	render() {
		return (
			<TouchableWithoutFeedback>
				<View style={[styles.errorContainer]}>
					<Svg
						icon="ic-wya"
						size={280 * WIDTH_SCALE}
						color={LIGHT_GRAY_COLOR}
					/>
					<ActivityIndicator size="large" color={LIGHT_GRAY_COLOR} />
				</View>
			</TouchableWithoutFeedback>
		)
	}
}
export default PageLoading;
