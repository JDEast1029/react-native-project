import React from 'react';
import {connect} from 'react-redux';
import {
	View,
	Text,
	Button
} from 'react-native';
import { NavigationActions } from 'react-navigation';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {navigate, dispatch} = this.props.navigation;
		const loginAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: 'Home', params: {name: 'east'}})
			]
		});

        return (
            <View>
                <Text>登录</Text>
                <Button onPress={() => {
                	dispatch(loginAction)
				}} title="go home"/>
            </View>
        )
    }
}

export default App;