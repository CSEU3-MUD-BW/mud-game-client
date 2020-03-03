import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { signup } from '../redux/actions/actionCreators'

const SignUp = props => {

    const username = useRef();
    
    const password = useRef();

    const handleSubmit = () => {

        console.log('im here')
        const userData = {
            username: username.current.value,         
            password1: password.current.value,
            password2: password.current.value
        }

        if (userData.username && userData.password1) {
            props.signup(userData)
        }
    }


    return (
        <div>
            Welcome to the SignUp page
            <div>
                <input type="text" placeholder="UserName" required ref={username} />
            </div>

            <div>
                <input type="password" placeholder="Password" required ref={password} />
            </div>

            <button onClick={handleSubmit}> SignUp </button>

        </div>
    )
}

const mapStateToProps = store => {
    return {
        loading: store.authentication.loading,
        error: store.authentication.error
    }
}

const mapDispatchToProps = {
    signup
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);