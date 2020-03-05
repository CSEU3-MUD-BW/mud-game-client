import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRooms, initializeGame } from '../redux/actions/actionCreators';
import { movePlayer } from '../redux/actions/actionCreators';


function Sidebox(props) {

    useEffect(() => {
        props.getRooms()
        props.initialize()
    }, [])   

    let title = '';
    let description = '';
    if (props.rooms.length) {
        title = props.rooms[props.roomId - 1].title;
        description = props.rooms[props.roomId - 1].description;
    }

    function updatePlayerPosition(position) {
        switch (position) {
            case 'n':
                return props.movePlayer('n');
            case 's':
                return props.movePlayer('s');
            case 'e':
                return props.movePlayer('e');
            case 'w':
                return props.movePlayer('w');

            default:
                return position;

        }

    }

    return (
        <div className='sidebox-container' >
            <div className='section top'>
                <p className='sidebox-title'>{title}</p>
                <p className='sidebox-description'>{description}</p>

                <div className='sidebox-mini-container'>
                    <p className='sidebox-mini'>ITEMS</p>
                    <p className='sidebox-mini' style={{
                        marginRight:'5px'
                    }}>{props.number} PLAYER IN ROOM</p>

                </div>
            </div>

            <div className='section middle'>
                <div className='direction-container'>
                    <div className='direction' onClick={() => {
                        updatePlayerPosition('n')
                    }}>
                        <p>N</p>
                    </div>

                    <div className='sidebox-direction'>
                        <div className='direction' onClick={() => {
                            updatePlayerPosition('w')
                        }}>
                            <p>W</p>
                        </div>
                        <div className='direction' onClick={() => {
                            updatePlayerPosition('e')
                        }}>
                            <p>E</p>
                        </div>
                    </div>

                    <div className='direction' onClick={() => {
                        updatePlayerPosition('s')
                    }}>
                        <p>S</p>
                    </div>
                </div>

                <div className='move-message'>
                    <p>{props.error}</p>
                </div>
            </div>

            <div className='section bottom'>
                <p className='chat-box'>Chat Box</p>
                <div className='sidebox-footer'>
                    <p className='chat-box-message'>Message</p>
                    <p className='enter'>Enter</p>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = store => {
    return {
        // rooms: store.room.rooms,
        position: store.player.position,
        roomId:store.player.roomId,
        error:store.player.error,
        number: store.player.numberOfPlayers
    }
}

const mapDispatchToProps = {
    getRooms,
    initialize: initializeGame,
    movePlayer:movePlayer,

}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebox);