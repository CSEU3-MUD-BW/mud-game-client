import React, { useEffect } from 'react';
import { MAP_WIDTH, MAP_HEIGHT } from '../redux/constant';
import { connect } from 'react-redux';
import { getRooms } from '../redux/actions/actionCreators';
import {chunkArray} from '../utils/helpers'


function Map(props) {


    useEffect(() => {
        props.getRooms()
    }, [])

    let rooms = chunkArray(props.rooms, 10)

    return (
        <div style={{
            width: ` ${MAP_WIDTH}px`,
            height: `${MAP_HEIGHT}px`,
            backgroundColor: 'grey',
            border: '1px solid black',
            margin: '10px auto',
        }}>
        </div>
    )
}
const mapStateToProps = store => {
    return {
        rooms: store.room.rooms
    }
}

const mapDispatchToProps = {
    getRooms
}
export default connect(mapStateToProps, mapDispatchToProps)(Map);