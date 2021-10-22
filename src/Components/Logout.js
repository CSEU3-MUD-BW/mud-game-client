import React from 'react';
import {history} from "../index";


function Logout(props) {

    const onLogout = () => {
        localStorage.removeItem("token");
        // localStorage.removeItem("user");
        history.push("/");
        window.location.replace("/");

    }

    return (
        <div className='modal-wrapper'>
            <div className='inner-modal-wrapper'>
                <p className='text-h1-modal'>Are You Sure You want to Logout?</p>
                <div className='lg-btn-wrapper'>
                    <button className='confirm' onClick={onLogout}> Yes</button>
                    <button className='cancel' onClick={props.cancel}>No</button>
                </div>
            </div>
        </div>
    )
}

export default Logout;