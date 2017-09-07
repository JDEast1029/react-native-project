import React from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import {TabNavigator, NavigationActions} from "react-navigation";

import TabOne from './Modules/TabOne';
import TabTwo from './Modules/TabTwo';

const TabNav = TabNavigator({
	TabOne: {
		screen: TabOne
	},
	TabTwo: {
		screen: TabTwo
	}
}, {
	tabBarOptions: {
		activeTintColor: '#e91e63'
	},
	// initialRouteName: 'TabOne'//初始显示的route会导致点击Tab不能切换
});

export default TabNav;