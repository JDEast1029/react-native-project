import React from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import { NavigationActions } from "react-navigation";

class TabTwo extends React.Component {
	static navigationOptions = {
		tabBarLabel: 'Notifications',
		tabBarIcon: ({tintColor}) => (<Image
			style={[
				styles.icon, {
					tintColor: tintColor
				}
			]}/>)
	};

	render() {
		const navigateAction = NavigationActions.navigate({
			routeName: 'Login',
			params: {},
			action: NavigationActions.navigate({routeName: 'Login'})
		});
		//清空路由栈，并将 routeName 放在栈底， action数组中最后一个会在栈顶
		const resetAction = NavigationActions.reset({
			index: 1,   //决定显示的route
			actions: [
				NavigationActions.navigate({ routeName: 'TabNav', params:  {name: 'east'} }),
				NavigationActions.navigate({ routeName: 'Home', params: {name: 'from Tab'}})
			]
		});
		const backAction = NavigationActions.back({
			key: 'Home'
		});
		return (<Button onPress={() => this.props.navigation.dispatch(resetAction)} title="Go back home"/>);
	}
}

const styles = StyleSheet.create({
	icon: {
		width: 26,
		height: 26
	}
});

export default TabTwo;