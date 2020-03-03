import React from 'react';
import { connect } from 'react-redux';


function Home(props) {
    const onLogOut = () => {
        localStorage.removeItem('token');
        props.history.push('/')
    }

    return (
        <div className='container-h'>
            <h2>Welcome </h2>
            <p>This is where it all begins </p>
            <p onClick={onLogOut}> Log Out</p>
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