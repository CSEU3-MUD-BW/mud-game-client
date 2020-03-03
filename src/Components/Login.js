import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/actions/actionCreators';
import { Link } from 'react-router-dom';

const Login = props => {

    const username = useRef();
    const password = useRef();

    const handleSubmit = () => {

        const userData = {
            username: username.current.value,
            password: password.current.value,
        }

        if (userData.username && userData.password) {
            props.login(userData)
        }

    }

    if (props.token) {
        props.history.push('/home')
    }

    return (
        <div className='container'>
           <p className='intro'> Welcome to the Abandoned Spaceship </p>
            <div className='form-container'>

                <div>
                    <input className='input'  type="text" placeholder="UserName" required ref={username} />
                </div>

                <div>
                    <input className='input' type="password" placeholder="Password" required ref={password} />
                </div>

                <button className='form-button' onClick={handleSubmit} > Login </button>

                <p className='text-p'>
                    {" "}
                    Dont have an account yet? &nbsp; <Link to="/signup"> Sign up here </Link>{" "}
                </p>

            </div>

        </div>
    )
}

const mapStateToProps = store => {
    return {
        loading: store.authentication.loading,
        token: store.authentication.token,
        error: store.authentication.error
    }
}

const mapDispatchToProps = {
    login
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);