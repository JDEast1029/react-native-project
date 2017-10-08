/**
 * 图片 placeholder
 * ------  use guide  -------
 * <ImageLoad
  * 	style={{ width: 320, height: 250 }}
  * 	loadingStyle={{ size: 'small', color: 'gray' }}
  * 	source={{ uri: 'https://oss.ruishan666.com/image/common/agent_bg.png' }}
  * />
 * --------------------------
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, ImageBackground, ActivityIndicator, View } from 'react-native';

class ImageLoad extends PureComponent {
	static propTypes = {
		isShowActivity: PropTypes.bool,
	};

	static defaultProps = {
		isShowActivity: false,
	};

	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			isError: false
		};
		this.onLoadEnd = this.onLoadEnd.bind(this);
		this.onError = this.onError.bind(this);

	}

	onLoadEnd(){
		this.setState({
			isLoaded: true
		});
	}

	onError(){
		this.setState({
			isError: true
		});
	}

	render() {
		const {
			style, source, resizeMode, borderRadius, children,
			loadingStyle, placeholderSource, placeholderStyle,
			customImagePlaceholderDefaultStyle
		} = this.props;
		return(
			<ImageBackground
				onLoadEnd={this.onLoadEnd}
				onError={this.onError}
				style={[styles.backgroundImage, style]}
				source={source}
				resizeMode={resizeMode}
				borderRadius={borderRadius}
			>
				{
					(this.state.isLoaded && !this.state.isError) ? children :
						<View style={[styles.viewImageStyles, { borderRadius: borderRadius }]}>
							{
								this.props.isShowActivity &&
								<ActivityIndicator
									style={styles.activityIndicator}
									size={loadingStyle ? loadingStyle.size : 'small'}
									color={loadingStyle ? loadingStyle.color : 'gray'}
								/>
							}
							<Image
								style={placeholderStyle ? placeholderStyle : [styles.imagePlaceholderStyles, customImagePlaceholderDefaultStyle]}
								source={placeholderSource ? placeholderSource : require('./Images/empty-image.png')}
							>
							</Image>
						</View>
				}
				{
					this.props.children &&
					<View style={styles.viewChildrenStyles}>
						{
							this.props.children
						}
					</View>
				}
			</ImageBackground>
		);
	}
}

const styles = {
	backgroundImage: {
		position: 'relative',
	},
	activityIndicator: {
		position: 'absolute',
		margin: 'auto',
		zIndex: 9,
	},
	viewImageStyles: {
		flex: 1,
		backgroundColor: '#e9eef1',
		justifyContent: 'center',
		alignItems: 'center'
	},
	imagePlaceholderStyles: {
		width: 100,
		height: 100,
		resizeMode: 'contain',
		justifyContent: 'center',
		alignItems: 'center'
	},
	viewChildrenStyles: {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		position: 'absolute',
		backgroundColor: 'transparent'
	}
};

export default ImageLoad;
