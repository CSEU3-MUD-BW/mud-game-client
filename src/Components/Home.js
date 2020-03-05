import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getRooms } from '../redux/actions/actionCreators';
import { logout } from '../redux/actions/actionCreators';
import Sidebox from './Sidebox';
import Player from './Player';
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
            <p onClick={onLogOut}> Log Out</p>
            <div style={{ position: 'relative' }}>
                {rooms.length > 0 && <Map rooms={rooms} />}
                <Player />
            </div>
            {/* <World /> */}
            <Sidebox rooms={rooms} />
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