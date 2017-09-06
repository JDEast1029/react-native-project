import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Button} from 'react-native';
import TitleBar from '../../components/_common/TitleBar/TitleBar';

class App extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {navigate, state} = this.props.navigation;
        const { params } = state;

        return (
			<View>
				<TitleBar>
					<Text btn-type="left">left</Text>
				</TitleBar>
				<Text>主页{params.name}</Text>
				<Button onPress={() => navigate('TabNav', {name: 'east'})} title="go Tab"/>
			</View>
        )
    }
}

export default App;