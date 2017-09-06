import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/CreateStore';
import App from './App';

class Root extends Component {

  render() {
	const store = configureStore();

	return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Root;