import { createStore, combineReducers, applyMiddleware} from 'redux';
import { createForms } from 'react-redux-form';
import {Workdata} from './workdata';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';
 

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            workdata: Workdata,
            ...createForms({
                workdata: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}