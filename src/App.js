import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import * as actionCreators from './redux/actions/actionCreators';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import './App.css';
import Home from './Components/Home';


function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Login} />
      <Route exact path='/signup' component={SignUp} />
      <Route path='/home' render={props => withAuthCheck(Home, props)} />
   

    </div>
  );
}

function withAuthCheck(Component, props) {
  if (localStorage.getItem('token')) {
    return <Component {...props} />
  }
  return <Redirect to='/' />;
}

export default withRouter(connect(state => state, actionCreators)(App));
