/**
 * 扫码框遮罩层
 */
import React, { PureComponent } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	Animated,
	Easing
} from 'react-native';
import {HEIGHT_SCALE, WIDTH_SCALE, MAIN_COLOR, WINDOW_WIDTH} from '../../../common/AppConst';
import scanLine from './scan_line.png';

class ViewFinder extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			scanLine: new Animated.Value(0),
		};
	}

	componentWillUnmount() {
		this.isEndAnimation = true;
	}

	/**
	 * 扫描动画
	 */
	startAnimate() {
		this.state.scanLine.setValue(0);
		Animated.timing(this.state.scanLine, {
			toValue: 500 * WIDTH_SCALE,
			duration: 2000,
			easing: Easing.linear,
			useNativeDriver: true
		}).start(() => {
			if (!this.isEndAnimation){
				this.startAnimate()
			}
		});
	}

	renderTitle() {
		const { title } = this.props;
		if (!React.isValidElement(title)) {
			return <Text style={styles.describeText}>{title}</Text>
		}
		return title;
	}

	render() {
		const { cornerColor=MAIN_COLOR, footerView } = this.props;
		return (
			<View style={styles.modal}>
				<View style={styles.viewHeader}>
					{this.renderTitle()}
				</View>
				<View style={{flexDirection: 'row'}}>
					<View style={styles.shade}/>
					<View style={styles.qrcode}>
						<Animated.View style={[styles.line, {
							transform: [{
								translateY: this.state.scanLine
							}]
						}]}>
							<Image source={scanLine}/>
						</Animated.View>
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
					{footerView}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
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
		alignSelf:'center',
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

export default ViewFinder;


