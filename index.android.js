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
import configureStore from './app/store/CreateStore';
import APP from './app/App'

export default class dyb_app extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <Provider store={this.state.store}>
                <APP/>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('destiny_app', () => destiny_app);