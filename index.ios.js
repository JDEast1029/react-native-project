/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
    AppRegistry,
} from 'react-native';

import {Provider} from 'react-redux';
import store from './app/store/CreateStore';
import Root from './app/Root'

export default class destiny_app extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <Root />
        );
    }
}

AppRegistry.registerComponent('destiny_app', () => destiny_app);

