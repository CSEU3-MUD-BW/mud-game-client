import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Map from './Map';

function Home(props) {
    const onLogOut = () => {
        localStorage.removeItem('token');
        props.history.push('/')
    }

    return (
        <div className='container-h'>
            <h2>Welcome </h2>
            <p>This is where it all begins </p>
            {/* <Map rooms={rooms} /> */}
            <NavLink exact to='/' onClick={onLogOut}> Log Out</NavLink>
        </div>
    )
}

const mapStateToProps = () => {
    return {
        
    }
}

const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);