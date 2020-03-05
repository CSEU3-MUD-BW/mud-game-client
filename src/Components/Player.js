import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { movePlayer } from '../redux/actions/actionCreators';
import walkSprite from '../images/player_walk.png';

function Player(props) {


    useEffect(() => {
        window.addEventListener('keydown', e => {
            e.preventDefault();
            switch (e.keyCode) {
                case 38:
                    return props.movePlayer('n');
                case 40:
                    return props.movePlayer('s');
                case 39:
                    return props.movePlayer('e');
                case 37:
                    return props.movePlayer('w');
                default:
                    return e.keyCode;
            }
        });
    }, []);



    console.log(props)

    return (
        <div style={{
            position: 'absolute',
            top:props.player.position[0] * 63,
            left:props.player.position[1] * 63,
            backgroundImage:`url('${walkSprite}')`,
            width:'30px',
            height:'30px',
    
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
    movePlayer
}
export default connect(mapStateToProps, mapDispatchToProps)(Player);