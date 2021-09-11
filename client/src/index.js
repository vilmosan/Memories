import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './App';

function logger({ getState }) {
	return next => action => {
	console.log('will dispatch', action)
	// Call the next dispatch method in the middleware chain.    const returnValue = next(action)
	console.log('state after dispatch', getState())
	// This will likely be the action itself, unless    // a middleware further in chain changed it.    return returnValue  }}
}}
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);