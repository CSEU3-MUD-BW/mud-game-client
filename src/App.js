import React from 'react';
import {connect} from 'react-redux';
import {Route, Router, Redirect, withRouter} from 'react-router-dom';
import * as actionCreators from './redux/actions/actionCreators';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import './App.css';
import {createBrowserHistory} from 'history';
import Home from './Components/Home';

export const history = createBrowserHistory();

function App() {
    return (
        <div className="App">
            <ToastContainer/>
            <Router history={history}>
            <Route exact path='/' component={Login}/>
            <Route exact path='/signup' component={SignUp}/>
            <Route path='/home' render={props => withAuthCheck(Home, props)}/>
            </Router>
        </div>
    );
}

function withAuthCheck(Component, props) {
    if (localStorage.getItem('token')) {
        return <Component {...props} />
    }
    return <Redirect to='/'/>;
}

export default withRouter(connect(state => state, actionCreators)(App));
