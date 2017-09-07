/**
 * App根文件
 */

import React from 'react';
import { StackNavigator } from 'react-navigation';

import routeConfig from './routeConfig';
import stackConfig from './stackConfig';

const AppNavigator = StackNavigator(routeConfig, stackConfig);

export default  AppNavigator;