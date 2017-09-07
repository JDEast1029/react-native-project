/**
 * App根文件
 */

import React from 'react';
import {connect} from 'react-redux';
import {
    Text
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

import Login from './containers/Login/App';
import Home from './containers/Home/App';
import TabNav from './containers/TabNav/App';

const AppNavigator = StackNavigator(
    {
        Login: { 
            screen: Login,
            navigationOptions: ({navigation}) => ({
                title: 'Login',
                headerTitle: 'sfasd'
            })
        },
        Home: {
            screen: Home,
            navigationOptions: ({ navigation, screenProps }) => ({
                title: `${navigation.state.params.name}'s Profile'`,
            }),
        },
        TabNav: {
            screen: TabNav,
        }
    }, 
    {
        headerMode: 'none',                                                         //取消默认标题栏
		transitionConfig: () => {
			return {screenInterpolator: CardStackStyleInterpolator.forHorizontal}   //navigator水平切换
		}
	}
);

export default  AppNavigator;