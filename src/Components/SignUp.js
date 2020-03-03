import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { signup } from '../redux/actions/actionCreators'

const SignUp = props => {

    const username = useRef();
    const password = useRef();

    const handleSubmit = () => {

        const userData = {
            username: username.current.value,
            password1: password.current.value,
            password2: password.current.value
        }

        if (userData.username && userData.password1) {
            props.signup(userData)
        }
    }

    if (props.token) {
        props.history.push('/home')
    }

    return (
        <div className='container-su'>
            {/* Welcome to the SignUp page */}

            <div className='form-container'>

            <div>
                <input className='input'  type="text" placeholder="UserName" required ref={username} />
            </div>

            <div>
                <input className='input' type="password" placeholder="Password" required ref={password} />
            </div>

            <button className='form-button' onClick={handleSubmit}> SignUp </button>

            <p className='text-p'>
                {" "}
                Already have an account? &nbsp; <Link to="/"> Login</Link>{" "}
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
    signup
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);