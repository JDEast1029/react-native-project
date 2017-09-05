import React from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import { TabNavigator,NavigationActions  } from "react-navigation"

class MyHomeScreen extends React.Component {
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
            onPress={() => this.props.navigation.navigate('Notifications')}
            title="Go to notifications"/>);
    }
}

class MyNotificationsScreen extends React.Component {
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
        const backAction = NavigationActions.back({
            key: 'Login'
          })
        return (<Button onPress={() => this.props.navigation.dispatch(backAction)} title="Go back home"/>);
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26
    }
});

const MyApp = TabNavigator({
    Home: {
        screen: MyHomeScreen
    },
    Notifications: {
        screen: MyNotificationsScreen
    }
}, {
    tabBarOptions: {
        activeTintColor: '#e91e63'
    }
});

export default MyApp;