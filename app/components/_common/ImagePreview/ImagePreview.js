/**
 * 图片预览
 */
import React, { Component, PureComponent } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	ListView,
	Modal,
	StatusBar
} from 'react-native';
import PropTypes from 'prop-types';
// import { Modal } from 'antd-mobile';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../../common/AppConst';
import ImageZoom from './ImageZoom';
import TransformView from './TransformView';
import AlbumView from 'teaset/components/AlbumView/AlbumView';

const images = [{
	url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
}, {
	url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
}, {
	url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
}];

class ImagePreview extends Component {
	constructor(props) {
		super(props);
		let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			visible: props.visible,
		};
		this.onCloseModal = this.onCloseModal.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.visible !== nextProps.visible) {
			this.setState({visible: nextProps.visible})
		}
	}

	onCloseModal() {
		this.setState({visible: false})
	}

	render() {
		// const { images } = this.props;
		return (
			<AlbumView
				style={{flex: 1, backgroundColor: '#0e0e0e'}}
				images={[
					{uri: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'},
					{uri: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'},
					{uri: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'},
					{uri: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'},
				]}
				control={true}
			/>
		)

		// return (
		// 	<Modal
		// 		visible={this.state.visible}
		// 		transparent={true}
		// 		animationType="fade"
		// 		onRequestClose={this.onCloseModal}
		// 		>
		// 		<AlbumView
		// 			style={{flex: 1, backgroundColor: '#0e0e0e'}}
		// 			images={[
		// 				{uri: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'},
		// 				{uri: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'},
		// 				{uri: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'},
		// 				{uri: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'},
		// 			]}
		// 			control={true}
		// 		/>
		// 	</Modal>
		// )
	}
}

ImagePreview.propTypes = {
	images: PropTypes.array
};

export default ImagePreview
