import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router } from "react-router-dom";
import { applyMiddleware, createStore, compose } from "redux";
import { Provider } from "react-redux";
import logger from 'redux-logger';
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers/index";
import {createBrowserHistory} from "history";

const middleware = [thunk, logger];
export const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  {},
  composeEnhancers(
    applyMiddleware(...middleware),
  )
);


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'));
