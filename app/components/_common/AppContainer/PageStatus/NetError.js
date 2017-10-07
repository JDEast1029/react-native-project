/**
 * 404 错误
 */
import React, { PureComponent } from 'react';
import {
	View,
	Text,
	TouchableWithoutFeedback
} from 'react-native';
import Svg from '../../Svg/Svg';
import { WIDTH_SCALE, GRAY_COLOR } from '../../../../common/AppConst';
import styles from '../AppContainerStyle';

class NetError extends PureComponent {

	render() {
		return (
			<TouchableWithoutFeedback
				onPress={this.props.onRefresh}
			>
				<View style={styles.errorContainer}>
					<Svg
						icon="ic-404-error"
						size={280 * WIDTH_SCALE}
						color={GRAY_COLOR}
					/>
					<Text style={styles.errorText}>网络异常，请点击刷新</Text>
				</View>
			</TouchableWithoutFeedback>
		)
	}
}

export default NetError;