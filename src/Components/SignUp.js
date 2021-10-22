import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import * as Yup from "yup";
import {apiURL, signup} from '../redux/actions/actionCreators'
import LaddaButton, {EXPAND_LEFT, L} from "react-ladda";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import {toast} from "react-toastify";
import * as types from "../redux/actions/actionTypes";

const SignUp = props => {
    console.log(props)
    const [loading, setLoading] = useState(false);

    const initialState = {
        username: "",
        password1: "",
        password2: "",

    }

    const validation = Yup.object().shape({
        username: Yup.string()
            .min(.4, "username must be minimum of 8 characters")
            .required('Field can not be empty'),
        password1: Yup.string()
            .required('Field can not be empty'),
        password2: Yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Both passwords need to be the same"
            )
        })

    });

    const onSubmit = (values) => {
        setLoading(true)
        axios.post(`${apiURL}/registration/`, values)
            .then(res => {
                console.log(res)
                toast.success("You have registered successfully!", {
                    position: toast.POSITION.TOP_CENTER
                });
                localStorage.setItem('token', res.data.key)
                props.history.push('/home')
                setLoading(false);
            })
            .catch(error => {
                console.log(error.response);
                if (error.response.data.password1) {
                    error.response.data.password1.length && (
                        error.response.data.password1.map(err => {
                            toast.error(err, {
                                position: toast.POSITION.TOP_RIGHT
                            })
                        })
                    )
                } else if (error.response.data.username) {
                    error.response.data.username.length && (
                        error.response.data.username.map(err => {
                            toast.error(err, {
                                position: toast.POSITION.TOP_RIGHT
                            })
                        })
                    )
                } else {
                    toast.error("Oops an error occured !", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
                setLoading(false);
            });
    }

    // const username = useRef();
    // const password = useRef();
    //
    // const handleSubmit = () => {
    //
    //     const userData = {
    //         username: username.current.value,
    //         password1: password.current.value,
    //         password2: password.current.value
    //     }
    //
    //     if (userData.username && userData.password1) {
    //         props.signup(userData)
    //     }
    // }
    //
    // if (props.token) {
    //     props.history.push('/home')
    //     console.log(props)
    // }
    //
    // return (
    //     <div className='container-su'>
    //         <p className='intro'> Welcome to MUDerelict </p>
    //
    //         <div className='form-container'>
    //
    //         <div>
    //             <input className='input'  type="text" placeholder="UserName" required ref={username} />
    //         </div>
    //
    //         <div>
    //             <input className='input' type="password" placeholder="Password" required ref={password} />
    //         </div>
    //
    //         <button className='form-button' onClick={handleSubmit}> SignUp </button>
    //
    //         <div className='text-p'>
    //             <p>Already have an account?</p>
    //             <p><Link to="/">Login</Link></p>
    //         </div>
    //
    //         </div>
    //
    //     </div>
    // )

    return (
        <div className='container-su'>
            <p className='intro'> Welcome to MUDerelict </p>
            <div className='form-container'>

                <Formik
                    initialValues={initialState}
                    validationSchema={validation}
                    onSubmit={onSubmit}
                >
                    {props => {
                        return (
                            <Form>

                                <div className='form-holder'>

                                    <div>
                                        <p className='input-label'> Enter your Username <b>*</b></p>
                                        <Field className='input' type='text' name='username'
                                               placeholder='Enter your username'/>
                                        <ErrorMessage className='yup-error' name='username' component='div'/>
                                    </div>

                                    <div>
                                        <p className='input-label'> Enter your password <b>*</b></p>
                                        <Field className='input' type='password' name='password1'
                                               placeholder='Enter your password'/>
                                        <ErrorMessage className='yup-error' name='password1' component='div'/>
                                    </div>

                                    <div>
                                        <p className='input-label'> Confirm your password <b>*</b></p>
                                        <Field className='input' placeholder='Confirm your password' type='password'
                                               name='password2'/>
                                        <ErrorMessage className='yup-error' name='password2' component='div'/>
                                    </div>


                                    <LaddaButton
                                        loading={loading}
                                        data-color="#eee"
                                        data-size={L}
                                        data-style={EXPAND_LEFT}
                                        className='form-button'
                                        data-spinner-size={20}
                                        data-spinner-color="#ddd"
                                        type='submit'
                                        data-spinner-lines={12}
                                    >
                                        Signup
                                    </LaddaButton>
                                    <div className='text-p'>
                                        <p>Already have an account?</p>
                                        <p><Link to="/">Login</Link></p>
                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
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
    // signup
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);