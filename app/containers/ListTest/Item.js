/**
 * Created by Administrator on 2017/10/7.
 */
import React, { PureComponent, Component } from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';

class Item extends PureComponent {
	render() {
		console.log(this.props.data.name)
		return (
			<View style={{height: 50, backgroundColor: '#ffffff', borderBottomWidth: StyleSheet.hairlineWidth}}><Text>{this.props.data.name}</Text></View>
		)
	}
}

export default Item;