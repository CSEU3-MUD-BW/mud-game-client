import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRooms, movePlayer } from '../redux/actions/actionCreators';
import { logout } from '../redux/actions/actionCreators';
import Sidebox from './Sidebox';
import Map from './Map';

function Home(props) {
    const {
        rooms, getRooms,
        player, movePlayer 
    } = props;

    useEffect(() => {
        getRooms()
    }, [])

    window.addEventListener('keydown', e => {
        e.preventDefault();
        switch (e.keyCode) {
            case 38:
                return movePlayer('n');
            case 40:
                return movePlayer('s');
            case 39:
                return movePlayer('e');
            case 37:
                return movePlayer('w');
            default:
                return e.keyCode;
        }
    });

    const onLogOut = () => {
        localStorage.removeItem('token');
        props.logout()
        props.history.push('/')
    }

    return (
        <div className='container-h'>
            <button className='logout' onClick={onLogOut}> Log Out</button>
            <div style={{ position: 'relative' }}>
                {rooms.length > 0 && <Map rooms={rooms} player={player} />}
            </div>
            <Sidebox rooms={rooms} />
        </div>
    )
}

const mapStateToProps = store => {
    return {
        rooms: store.rooms,
        player: store.player
    }
}

const mapDispatchToProps = {
    logout,
    getRooms,
    movePlayer
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);