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
			scanLine: new Animated.Value(0),
			lightOff: true
		};
		this.toggleFlashLight = this.toggleFlashLight.bind(this);
		this.onBarCodeRead = this.onBarCodeRead.bind(this);
	}

	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.setState({show: true});
			setTimeout(() => {
				this.isEndAnimation = false;
				this.lineAnimated();
			}, 1000)
		})
	}

	componentWillUnmount() {
		this.isEndAnimation = true;
	}

	/**
	 * 扫描动画
	 */
	lineAnimated() {
		this.state.scanLine.setValue(0);
		Animated.timing(this.state.scanLine, {
			toValue: 500 * WIDTH_SCALE,
			duration: 2000,
			easing: Easing.linear,
			useNativeDriver: true
		}).start(() => {
			if (!this.isEndAnimation){
				this.lineAnimated()
			}
		});
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

	renderTitle() {
		const { title } = this.props;
		if (!React.isValidElement(title)) {
			return <Text style={styles.describeText}>{title}</Text>
		}
		return title;
	}

	/**
	 * 换面预览上面的遮罩
	 */
	renderScanView() {
		const { cornerColor=MAIN_COLOR } = this.props;
		return (
			<View style={styles.modal}>
				<View style={styles.viewHeader}>
					{this.renderTitle()}
				</View>
				<View style={{flexDirection: 'row'}}>
					<View style={styles.shade}/>
					<View style={styles.qrcode}>
						<Animated.View style={[styles.line, {backgroundColor: cornerColor}, {
							transform: [{
								translateY: this.state.scanLine
							}]
						}]}/>
						{/*扫码框边角*/}
						<View style={{backgroundColor: cornerColor, position: 'absolute', width: 50 * WIDTH_SCALE, height: 7  * HEIGHT_SCALE, top: 0,    left: 0}}/>
						<View style={{backgroundColor: cornerColor, position: 'absolute', width: 50 * WIDTH_SCALE, height: 7  * HEIGHT_SCALE, top: 0,    right: 0}}/>
						<View style={{backgroundColor: cornerColor, position: 'absolute', width: 7  * WIDTH_SCALE, height: 50 * HEIGHT_SCALE, top: 0,    left: 0}}/>
						<View style={{backgroundColor: cornerColor, position: 'absolute', width: 7  * WIDTH_SCALE, height: 50 * HEIGHT_SCALE, top: 0,    right: 0}}/>
						<View style={{backgroundColor: cornerColor, position: 'absolute', width: 7  * WIDTH_SCALE, height: 50 * HEIGHT_SCALE, bottom: 0, left: 0}}/>
						<View style={{backgroundColor: cornerColor, position: 'absolute', width: 7  * WIDTH_SCALE, height: 50 * HEIGHT_SCALE, bottom: 0, right: 0}}/>
						<View style={{backgroundColor: cornerColor, position: 'absolute', width: 50 * WIDTH_SCALE, height: 7  * HEIGHT_SCALE, bottom: 0, left: 0}}/>
						<View style={{backgroundColor: cornerColor, position: 'absolute', width: 50 * WIDTH_SCALE, height: 7  * HEIGHT_SCALE, bottom: 0, right: 0}}/>
					</View>
					<View style={styles.shade}/>
				</View>
				<View style={[styles.shade, styles.viewFooter]}>
					<Svg
						icon={this.state.lightOff ? 'ic-light-off' : 'ic-light-on'}
						size={50 * WIDTH_SCALE}
						color={'#fff'}
						style={{marginTop: 60 * HEIGHT_SCALE}}
						onPress={this.toggleFlashLight}
					/>
				</View>
			</View>
		)
	}

	render() {
		const { show, lightOff } = this.state;

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
					{this.renderScanView()}
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
	},

	modal: {
		flex: 1,
		width: WINDOW_WIDTH,
	},

	shade: {
		flex: 1,
		backgroundColor: 'rgba(1, 1, 1, 0.65)',
	},

	qrcode: {
		width: 500 * WIDTH_SCALE,
		height: 500 * WIDTH_SCALE,
		alignItems: 'center',
	},

	line: {
		width: 490 * WIDTH_SCALE,
		height: StyleSheet.hairlineWidth * 2
	},

	viewHeader: {
		backgroundColor: 'rgba(1, 1, 1, 0.65)',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 200 * HEIGHT_SCALE
	},

	viewFooter: {
		backgroundColor: 'rgba(1, 1, 1, 0.65)',
		alignItems: 'center'
	},
	describeText: {
		color: '#FFFFFF',
		fontSize: 30 * HEIGHT_SCALE,
		marginTop: 100 * HEIGHT_SCALE
	}
});

export default QRScanner;
