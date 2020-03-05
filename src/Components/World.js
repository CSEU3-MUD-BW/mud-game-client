import React from 'react';
import { MAP_WIDTH, MAP_HEIGHT } from '../redux/constant';
import Map from './Map';
import Player from './Player';

function World() {
    return (
        <div style={{
            position: 'relative',
            width: `${MAP_WIDTH}px`,
            height: `${MAP_HEIGHT}px`,
            margin: '20px auto',

        }}>
            <Map />
            <Player />
        </div>
    )
}

export default World;