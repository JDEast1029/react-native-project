import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Button} from 'react-native';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View>
                <Text>登录</Text>
                <Button onPress={() => navigate('Home', {name: 'east'})} title="go home"/>
            </View>
        )
    }
}

export default App;