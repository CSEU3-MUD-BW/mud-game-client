import React, { useEffect } from 'react';
import { chunkArray } from '../utils/helpers';
import { connect } from 'react-redux';
import { getRooms, initializeGame } from '../redux/actions/actionCreators';
import { movePlayerUp, movePlayerDown, movePlayerRight, movePlayerLeft } from '../redux/actions/actionCreators';


function Sidebox(props) {

    useEffect(() => {
        props.getRooms()
        props.initialize()
    }, [])


    let rooms = chunkArray(props.rooms, 10);
    console.log(rooms)

    let x = props.position[1] / 40;
    let y = props.position[0] / 40;


    let title = '';
    let description = '';
    if (rooms.length) {
        title = rooms[x][y].title;
        description = rooms[x][y].description;
    }

    function updatePlayerPosition(position) {
        switch (position) {
            case 'n':
                return props.up();
            case 's':
                return props.down();
            case 'e':
                return props.right();
            case 'w':
                return props.left();

            default:
                return position;

        }

    }


    return (
        <div className='sidebox-container' >
            <p className='sidebox-title'>{title}</p>
            <p className='sidebox-description'>{description}</p>

            <div className='sidebox-mini-container'>
                <p className='sidebox-mini'>ITEMS</p>
                <p className='sidebox-mini'>{props.number} PLAYERS IN ROOM</p>

            </div>

        
                <div>

                    <div className='direction-container'>
                        <p className='direction' onClick={() => {
                            updatePlayerPosition('n')
                        }}>
                            N
            </p>

                        <div className='sidebox-direction'>
                            <p className='direction' onClick={() => {
                                updatePlayerPosition('w')
                            }}>
                                W
            </p>
                            <p className='direction' onClick={() => {
                                updatePlayerPosition('e')
                            }}>
                                E
            </p>

                        </div>
                        <p className='direction' onClick={() => {
                            updatePlayerPosition('s')
                        }}>
                            S
            </p>
                    </div>

                    <div>
                        <p className='Error-message'>Error Message</p>
                    </div>

                </div>

            <p className='chat-box'>Chat box</p>
            <div className='sidebox-footer'>
            <p className='chat-box-message'>Message</p>
            <p className='enter'>Enter</p>
            </div>

        </div>
    )
}
const mapStateToProps = store => {
    return {
        rooms: store.room.rooms,
        position: store.player.position,
        number: store.room.numberOfPlayers
    }
}

const mapDispatchToProps = {
    getRooms,
    initialize: initializeGame,
    up:movePlayerUp,
    down:movePlayerDown,
    right:movePlayerRight,
    left: movePlayerLeft

}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebox);