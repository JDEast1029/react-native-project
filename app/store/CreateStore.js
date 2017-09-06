import {AsyncStorage} from 'react-native';
import {compose, applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import {persistStore, autoRehydrate} from'redux-persist';
import rootReducer from '../reducers/rootReducer';

function configureStore(initialState) {
	const logger = createLogger();
	const middleware = [];

	if (__DEV__) {
		middleware.push(logger);
	}

	let finalCreateStore = compose(applyMiddleware(...middleware))(createStore);
	const store = finalCreateStore(rootReducer, initialState);

	if (__DEV__) {
		window.store = store
	}

	return store;
}

export default configureStore;