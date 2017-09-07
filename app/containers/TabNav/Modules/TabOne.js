import React from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import { NavigationActions } from "react-navigation";

class TabOne extends React.Component {
	static navigationOptions = {
		tabBarLabel: 'Home',
		// Note: By default the icon is only shown on iOS. Search the showIcon option
		// below.
		tabBarIcon: ({tintColor}) => (<Image
			style={[
				styles.icon, {
					tintColor: tintColor
				}
			]}/>)
	};

	render() {
		return (<Button
			onPress={() => this.props.navigation.navigate('TabTwo')}
			title="Go to notifications"/>);
	}
}
const styles = StyleSheet.create({
	icon: {
		width: 26,
		height: 26
	}
});

export default TabOne;