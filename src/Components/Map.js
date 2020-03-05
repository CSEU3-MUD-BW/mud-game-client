import React, { useState, useEffect } from 'react'

function Map(props) {
  const { rooms } = props;

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
          debugger
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
        gridCopy = [new Array(gridCopy[0].length), new Array(gridCopy[0].length), ...gridCopy];
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
      debugger
      if (y === gridCopy.length - 1) {
        gridCopy = [...gridCopy, new Array(gridCopy[0].length), new Array(gridCopy[0].length)];
        debugger
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
    debugger
    for (let y = 0; y < gridCopy.length; y += 2) {
      for (let x = 0; x < gridCopy[0].length; x += 2) {
        if (gridCopy[y][x] === roomId.toString()) {
          return [x, y]
        }
      }
    }
  };

  console.log(grid);
  return (
    <div className='map'>
      {grid.forEach(row => {
        row.forEach(symbol => (
          symbol === '==' ?
            <div className='map horizontal-connector' /> :
          symbol === '||' ?
            <div className='map vertical-connector' /> :
          symbol === undefined ? 
            <div className='map gap' /> :
          <div className='map room' />
        ))
      })}
    </div>
  )
}

export default Map;
