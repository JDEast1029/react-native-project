/**
 * 系统异常
 */
import React, { PureComponent } from 'react';
import {
	View,
	Text,
	TouchableWithoutFeedback
} from 'react-native';
import Svg from '../../Svg/Svg';
import { WIDTH_SCALE } from '../../../../common/AppConst';
import styles from '../AppContainerStyle';

class SystemError extends PureComponent {

	render() {
		return (
			<TouchableWithoutFeedback
				onPress={this.props.onRefresh}
			>
				<View style={styles.errorContainer}>
					<Svg
						icon="ic-error-page"
						size={350 * WIDTH_SCALE}
					/>
					<Text style={styles.errorText}>系统异常，请点击刷新</Text>
				</View>
			</TouchableWithoutFeedback>
		)
	}
}

export default SystemError;
