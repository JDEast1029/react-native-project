import React from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import {TabNavigator, NavigationActions} from "react-navigation";
import { HEIGHT_SCALE, WIDTH_SCALE, MAIN_COLOR, TEXT_COLOR } from '../../common/AppConst';

import Home from './Modules/Home';
import User from './Modules/User';

const TabNav = TabNavigator({
	Home: {
		screen: Home
	},
	User: {
		screen: User
	}
}, {
	lazy: true,                            //只初始化当前页面，其他页面不会初始化
	tabBarOptions: {
		showIcon:true,                     //显示图标
		backBehavior: 'none',               //按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
		activeTintColor: MAIN_COLOR,
		inactiveTintColor: TEXT_COLOR,
		style:{ backgroundColor:'#ffffff' },
		labelStyle: {
			fontSize: 20 * WIDTH_SCALE,
			marginBottom: 10 * HEIGHT_SCALE
		},
		tabStyle: {
			height: 100 * HEIGHT_SCALE,
		},
		iconStyle: {
			marginTop: 10 * HEIGHT_SCALE,
			marginBottom: -10 * HEIGHT_SCALE
		},
		indicatorStyle: {
			backgroundColor: 'transparent'
		}
	},
	tabBarPosition:'bottom',
	swipeEnabled: false,
	animationEnabled: true,
	// initialRouteName: 'TabOne'//初始显示的route会导致点击Tab不能切换
});

export default TabNav;