import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Logger from 'redux-logger';
// import tasks from './reducers';
import mainReducer from './reducers';
import App from './components/App';
// import initialData from '../data';

const initialState={
	time:"",
	timeRate:"PAUSED",
	countryShapes:{},
}

const store = createStore(
    mainReducer, // reducers
    initialState,
    applyMiddleware(ReduxThunk,Logger)
);

render(
    <Provider store={store}>
        <App store={store} />
    </Provider>,
    document.getElementById('app')
);
