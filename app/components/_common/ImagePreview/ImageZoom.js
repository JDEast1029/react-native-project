/**
 * 适配手势的Image
 */
import React, {Component} from 'react';
import {
	View,
	Image,
	StyleSheet,
	PanResponder,
	Animated
} from 'react-native';
import PropTypes from 'prop-types';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from '../../../common/AppConst';
import TransformView from './TransformView';

class ImageZoom extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<TransformView containerStyle={styles.imageContainer}>
				<Image
					style={[styles.image, this.props.style]}
					resizeMode="cover"
					source={{uri: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'}}
				/>
			</TransformView>
		)
	}
}

const styles = StyleSheet.create({
	imageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: WINDOW_WIDTH,
		height: WINDOW_HEIGHT
	},
	image: {
		width: WINDOW_WIDTH,
		height: 300,
	}
});

export default ImageZoom;
