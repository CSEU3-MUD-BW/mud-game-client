import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

const StyledMapDiv = styled.div`
  animation: drift 100s 0s infinite linear;
    
  @keyframes drift {
    0% { transform: rotate(0deg) }
    25% { transform: rotate(-10deg) }
    50% { transform: rotate(0deg) }
    75% { transform: rotate(10deg) }
    100% { transform: rotate(0deg) }
  }

  h2 {
    margin-bottom: 0.5rem;
    font-family: 'Press Start 2P', cursive;
    color: #F3F3F3;
  }

  .map {
      width: 500px;
      height: 500px;
      background: #505050;
      /* margin: 0 auto; */
      padding: 1rem;
      border-radius: 10px;
      
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      
      .row {
        width: 100%;
        
        flex: 1;
        display: flex;
        
        .tile {
          box-sizing: border-box;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          background: #0A0A0A;
        }
        
        .symbol {
        height: 100%;
        flex: 1;
        
        &.room {
          display: flex;
          justify-content: center;
          align-items: center;
          
          .tile {
            height: 100%;
            width: 100%;
            
            border: 3px solid #F3F3F3;
            border-radius: 5px;
          }
          
          &.current .tile {
            background: #F3F3F3;
            border: 3px solid #0A0A0A;
          }
        }
        
        &.horizontal-connector {
          display: flex;
          justify-content: center;
          align-items: center;
          
          .tile {
            height: 30%;
            width: 100%;
            
            border-top: 2px solid #F3F3F3;
            border-bottom: 2px solid #F3F3F3;
          }
        }
        
        &.vertical-connector {
          display: flex;
          justify-content: center;
          align-items: center;
          
          .tile {
            height: 100%;
            width: 30%;
            
            border-left: 2px solid #F3F3F3;
            border-right: 2px solid #F3F3F3;
          }
        }
      }
    }
  }
`;
  
  function Map(props) {
  const { rooms, player } = props;

  //
  const [grid, setGrid] = useState([])
  
  useEffect(() => {
    // On component load, generate grid
    setGrid(generateGrid())
    // Will look something like this:
    //
    //  [['id','==','id',    ,'id']
    //   [    ,    ,'||',    ,'||']
    //   ['id','==','id','==','id']
    //   [    ,    ,'||',    ,'||']
    //   [    ,    ,'id','==','id']]
  }, [])
  
  // Helpers:
  let gridCopy = [[rooms[0].id.toString()]];
  const generateGrid = () => {
    let visited = [];
    let toVisit = [rooms[0]];
    
    while (toVisit.length > 0) {
      const room = toVisit.pop();

      const n = room.n_to;
      const e = room.e_to;
      const s = room.s_to;
      const w = room.w_to;

      const neighbours = [n, e, s, w];
      neighbours.forEach((roomId, i) => {
        const roomsIndex = roomId - 1;
        if (roomId !== 0 && !visited.includes(rooms[roomsIndex])) {
          addToGrid(getGridPosition(room.id), roomId, i);
          toVisit.unshift(rooms[roomsIndex]);
        }
      });

      visited.push(room);
    }

    return gridCopy;
  };
  
  const addToGrid = (currentGridPosition, roomId, direction) => {
    const [x, y] = currentGridPosition;

    if (direction === 0) { // North
      // If there's a row above the current room in the grid
      if (y >= 2) {
        // put a connection there, and roomId in the row above _it_
        gridCopy[y - 1][x] = '||';
        gridCopy[y - 2][x] = roomId.toString();
      } else {
        // else make two new rows above
        gridCopy = [new Array(gridCopy[0].length).fill(undefined), new Array(gridCopy[0].length).fill(undefined), ...gridCopy];
        // and insert the connection and roomId
        gridCopy[1][x] = "||";
        gridCopy[0][x] = roomId.toString();
      }
    } else if (direction === 1) { // East
      // If there are no columns to the East, make them!
      if (x === gridCopy[0].length - 1){
        gridCopy.forEach(row => {
          row.push(undefined);
          row.push(undefined);
        })
      }
      gridCopy[y][x + 1] = '==';
      gridCopy[y][x + 2] = roomId.toString();
    } else if (direction === 2) { // South
      // If there are no rows to the South, make them!
      if (y === gridCopy.length - 1) {
        gridCopy = [...gridCopy, new Array(gridCopy[0].length).fill(undefined), new Array(gridCopy[0].length).fill(undefined)];
      }
      gridCopy[y + 1][x] = '||';
      gridCopy[y + 2][x] = roomId.toString();
    } else if (direction === 3) { // West
      if (x >= 2) {
        gridCopy[y][x - 1] = '==';
        gridCopy[y][x - 2] = roomId.toString();
      } else {
        gridCopy.forEach(row => {
          row.unshift(undefined);
          row.unshift(undefined);
        });

        gridCopy[y][1] = '==';
        gridCopy[y][0] = roomId.toString();
      }
    }
  };

  const getGridPosition = roomId => {
    // debugger
    for (let y = 0; y < gridCopy.length; y += 2) {
      for (let x = 0; x < gridCopy[0].length; x += 2) {
        if (gridCopy[y][x] === roomId.toString()) {
          return [x, y]
        }
      }
    }
  };

  // console.log(grid);
  return (
    <StyledMapDiv>
      <div className='title' >
        <h2>MUDerelict</h2>
      </div>
      <div className='map'>
        {
          grid.map((row, y) => (
            <div className='row' key={`row-${y}`}>
              {
                row.map((symbol, x) => (
                  symbol === '==' ?
                  <div className='symbol horizontal-connector' key={`symbol-${x}`}>
                      <div className='tile' />
                    </div> :
                  symbol === '||' ?
                  <div className='symbol vertical-connector' key={`symbol-${x}`}>
                      <div className='tile' />
                    </div> :
                  symbol === undefined ? 
                  <div className='symbol gap' key={`symbol-${x}`} /> :
                  symbol === player.roomId.toString() ?
                  <div className='symbol room current' key={`symbol-${x}`}>
                      <div className='tile' />
                    </div> :
                  <div className='symbol room' key={`symbol-${x}`}>
                    <div className='tile' />
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    </StyledMapDiv>
  )
}

export default Map;
