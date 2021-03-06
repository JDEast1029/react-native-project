/**
 * Svg icon
 */
import React, { PureComponent } from 'react';

import SvgUri from '../_lib/react-native-svg-uri/SvgUri';
import svgs from '../../../common/svg/svgs';

export default class Svg extends PureComponent {
	render() {
		const {
			icon,
			color,
			size,
			style,
			onPress
		} = this.props;
		let svgXmlData = svgs[this.props.icon];

		if (!svgXmlData) {
			let err_msg = `没有"${this.props.icon}"这个icon`;
			throw new Error(err_msg);
		}
		return (
			<SvgUri
				width={size}
				height={size}
				svgXmlData={svgXmlData}
				fill={color}
				style={style}
				onPress={onPress}
			/>
		)
	}
}
