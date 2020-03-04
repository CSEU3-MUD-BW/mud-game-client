import React, { useState, useEffect } from 'react'

function Map(props) {
  const { rooms } = props;
  rooms.sort((a, b) => a.id - b.id)
  console.log(rooms)

  // grid starts out as an array with a single room id in it
  const [grid, setGrid] = useState([rooms[0].id.toString()])

  useEffect(() => {
    // On component load, generate grid.
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
  };
  
  const addToGrid = (currentGridPosition, roomId, direction) => {
    const [x, y] = currentGridPosition;

    if (grid.length === 0) {
      setGrid([[roomId.toString()]])
    } else if (direction === 0) { // North
      // If there's a row above the current room in the grid
      if (y >= 2) {
        // put a connection there, and roomId in the row above _it_
        grid[y - 1][x] = '||';
        grid[y - 2][x] = roomId.toString();
      } else {
        // else make two new rows above
        const emptyRow = new Array(grid[0].length)
        setGrid([emptyRow, emptyRow, ...grid])
        // and insert the connection and roomId
        grid[1][x] = "||";
        grid[0][x] = roomId.toString();
      }
    } else if (direction === 1) { // East
      // If there are no columns to the East, make them!
      if (x === grid[0].length - 1){
        grid.forEach(row => {
          row.push(undefined);
          row.push(undefined);
        })
      }
      grid[y][x + 1] = '==';
      grid[y][x + 2] = roomId.toString();
    } else if (direction === 2) { // South
      // If there are no rows to the South, make them!
      if (y === grid.length - 1) {
        const emptyRow = new Array(grid[0].length);
        setGrid([...grid, emptyRow, emptyRow]);
      }
      grid[y + 1] = '||';
      grid[y + 2] = rooms.toString();
    } else if (direction === 3) { // West
      if (x >= 2) {
        grid[y][x - 1] = '==';
        grid[y][x - 2] = roomId.toString();
      } else {
        grid.forEach(row => {
          row.unshift(undefined);
          row.unshift(undefined);
        });

        grid[y][1] = '==';
        grid[y][0] = roomId.toString();
      }
    }
  };

  const getGridPosition = roomId => {
    for (let y = 0; y < grid.length; y += 2) {
      for (let x = 0; x < grid[0].length; x += 2) {
        if (grid[y][x] === roomId.toString()) {
          return [x, y]
        }
      }
    }
  };

  return (
    <div className='map-div'>
    </div>
  )
}
