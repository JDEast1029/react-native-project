/**
 * 二维码/条形码扫描
 */
import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	InteractionManager,
	ActivityIndicator,
	Animated,
	Easing,
	Vibration
} from 'react-native';
import PropTypes from 'prop-types';
import { Toast } from 'antd-mobile';

//业务组件、常量
import Camera from 'react-native-camera';
import Svg from '../Svg/Svg';
import ViewFinder from './ViewFinder';
import {HEIGHT_SCALE, WIDTH_SCALE, LIGHT_MAIN_COLOR, MAIN_COLOR, WINDOW_WIDTH} from '../../../common/AppConst';

class QRScanner extends Component {
	static propTypes = {
		onBarCodeRead: PropTypes.func,             //要有返回值bool
		vibrate: PropTypes.bool,                   //扫码成功 是否开启震动交互
		isScannable: PropTypes.bool,               //扫描能否发起回调由外层决定
		title: PropTypes.oneOfType([               //界面标题
			PropTypes.string,
			PropTypes.element
		])
	};

	static  defaultProps = {
		onBarCodeRead: () => {},
		title: '二维码扫描'
	};

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			lightOff: true
		};
		this.toggleFlashLight = this.toggleFlashLight.bind(this);
		this.onBarCodeRead = this.onBarCodeRead.bind(this);
	}

	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.setState({show: true});
			setTimeout(() => {
				this.viewFinder.startAnimate();
			}, 1000)
		})
	}

	/**
	 * 切换手电筒
	 */
	toggleFlashLight() {
		this.setState({lightOff: !this.state.lightOff})
	}

	/**
	 * 扫码成功回调
	 */
	onBarCodeRead(e) {
		const { vibrate, isScannable, onBarCodeRead } = this.props;
		if (isScannable) {
			vibrate ? Vibration.vibrate([0, 300, 200, 300]) : null;
			onBarCodeRead(e.data);
			console.log('scan data: ' + e.data);
		}
	}

	/**
	 * 照相机打开之前的过渡页面
	 */
	renderSplash() {
		return (
			<View style={styles.splash}>
				<ActivityIndicator
					color={LIGHT_MAIN_COLOR}
					size={"large"}
				/>
				<Text style={{color: '#fff', fontSize: 32 * WIDTH_SCALE}}>正在打开相机…</Text>
			</View>
		)
	}

	render() {
		const { show, lightOff } = this.state;
		const { cornerColor,title } = this.props;

		if (!show) return this.renderSplash();
		return (
			<View style={styles.container}>
				<Camera
					ref={(cam) => {
						this.camera = cam;
					}}
					style={styles.preview}
					torchMode={lightOff ? Camera.constants.TorchMode.off : Camera.constants.TorchMode.on} //手电筒模式
					onBarCodeRead={this.onBarCodeRead}
					aspect={Camera.constants.Aspect.fill}>

					<ViewFinder
						ref={(viewFinder) => this.viewFinder = viewFinder}
						cornerColor={cornerColor}
						title={title}
						footerView={
							<Svg
								icon={this.state.lightOff ? 'ic-light-off' : 'ic-light-on'}
								size={50 * WIDTH_SCALE}
								color={'#fff'}
								style={{marginTop: 60 * HEIGHT_SCALE}}
								onPress={this.toggleFlashLight}
							/>
						}
					/>
				</Camera>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#060606'
	},
	preview: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative'
	},
	capture: {
		flex: 0,
		backgroundColor: '#fff',
		borderRadius: 5,
		color: '#000',
		padding: 10,
		margin: 40
	},

	splash: {
		flex: 1,
		backgroundColor: '#060606',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default QRScanner;
