import {AsyncStorage} from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import {createLogger} from 'redux-logger';
import {persistStore, autoRehydrate} from'redux-persist';
import rootReducer from '../reducers/rootReducer';

function configureStore(onComplete) {
    const logger = createLogger()
    const middleware = []

    if (__DEV__) {
            middleware.push(logger);
    }

    const appStore = applyMiddleware(...middleware)(createStore)
    const store = autoRehydrate()(appStore)(rootReducer)

    persistStore(store, {
        storage: AsyncStorage,
        blacklist: [
            
        ]
    }, onComplete)

    if (__DEV__) {
        window.store = store
    }

    return store;
}

export default configureStore();