import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Home(props) {
    const onLogOut = () => {
        localStorage.removeItem('token');
        props.history.push('/')
    }

    return (
        <div>
            <h2>Welcome </h2>
            <p>This is where it all begins </p>
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