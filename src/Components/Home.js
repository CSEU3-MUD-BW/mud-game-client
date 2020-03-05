import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getRooms } from '../redux/actions/actionCreators';
import { logout } from '../redux/actions/actionCreators';
import Sidebox from './Sidebox';
import World from './World';

import Map from './Map';

function Home(props) {
    const { rooms, getRooms } = props;

    useEffect(() => {
        getRooms()
    }, [])

    const onLogOut = () => {
        localStorage.removeItem('token');
        props.history.push('/')
    }

    return (
        <div className='container-h'>
            <h2>Welcome </h2>
            <p>This is where it all begins </p>
            { rooms.length > 0 && <Map rooms={rooms} />}
            <p onClick={onLogOut}> Log Out</p>
            <World />
            <Sidebox />
        </div>
    )
}

const mapStateToProps = store => {
    return {
        rooms: store.rooms
    }
}

const mapDispatchToProps = {
    logout,
    getRooms
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);