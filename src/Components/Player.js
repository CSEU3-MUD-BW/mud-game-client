import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { movePlayerUp, movePlayerDown, movePlayerRight, movePlayerLeft } from '../redux/actions/actionCreators';
import walkSprite from '../images/player_walk.png';

function Player(props) {


    useEffect(() => {
        window.addEventListener('keydown', e => {
            e.preventDefault();
            switch (e.keyCode) {
                case 38:
                    return props.movePlayerUp();
                case 40:
                    return props.movePlayerDown();
                case 39:
                    return props.movePlayerRight();
                case 37:
                    return props.movePlayerLeft();
                default:
                    return e.keyCode;
            }
        });
    }, []);



    console.log(props)

    return (
        <div style={{
            position: 'absolute',
            top:props.player.position[1],
            left:props.player.position[0],
            backgroundImage:`url('${walkSprite}')`,
            width:'40px',
            height:'40px',
        }}>

        </div >
    );
}

const mapStateToProps = store => {
    return {
        ...store
    }
}

const mapDispatchToProps = {
    movePlayerUp,
    movePlayerDown,
    movePlayerRight,
    movePlayerLeft
}
export default connect(mapStateToProps, mapDispatchToProps)(Player);