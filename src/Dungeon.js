class Dungeon {
  constructor({mapSize, iterations, roomSize, rooms}) {
    this.mapSize = mapSize;
    this.dungeon = this.generateDungeon(iterations, roomSize, rooms);
  }

  generateDungeon(iterations, componentSize, minimumNumberOfRooms) {
    let roomCenters = [];
    let temporaryDungeon;
    let roomEntrances;
    let hallEnds;
    let type;
    let grid;
    let roomCenter;
    let newStartPoints;
    let usedStartPoint;

    // reject dungeons without minimum number of rooms
    while(roomCenters.length < minimumNumberOfRooms) {
      temporaryDungeon = this.initializeDungeon(componentSize); // create initial grid and room
      roomCenters = [];
      roomEntrances = [];
      hallEnds = [];

      // attempt to add a component
      for (let i = 0; i < iterations; i++) {

        // skip if initial iteration
        if (i > 0) {

          // assign component to a placeholder pending collision check
          temporaryDungeon = this.addRoomOrHall(grid, roomEntrances, hallEnds, componentSize);
        }

        // check for collision
        if (!temporaryDungeon.collision) {
          grid = Object.assign({},temporaryDungeon.grid);
          type = temporaryDungeon.type;
          newStartPoints = temporaryDungeon.hallEnd || temporaryDungeon.roomEntrances;
          roomCenter = temporaryDungeon.roomCenter;
          usedStartPoint = temporaryDungeon.usedStartPoint;

          // add new room entrances or hall end, remove the used one, and update room centers list
          if (type === 'hall') {
            hallEnds.push(newStartPoints);
            // eslint-disable-next-line
            roomEntrances.splice(roomEntrances.findIndex((roomEntrance) => roomEntrance === usedStartPoint), 1);
          } else {
            // eslint-disable-next-line
            newStartPoints.forEach((roomEntrance) => roomEntrances.push(roomEntrance));
            // eslint-disable-next-line
            hallEnds.splice(hallEnds.findIndex((hallEnd) => hallEnd === usedStartPoint), 1);
            roomCenters.push(roomCenter);
          }
        }
      }
    }

    // Remove extra hall
    // Add entry, exit, treasure, and monsters
    // Convert inner and wall tiles to floors and blanks
    return this.finalizeDungeon(grid, hallEnds, roomCenters);
  }

  addRoomOrHall(oldDungeon, roomEntrances, hallEnds, length) {
    let type;
    let startPoint;
    let newComponent;

    // if there are no hall ends: make a hall from a room entrance
    if (hallEnds.length === 0) {
      startPoint = this.randomStartPoint(roomEntrances);
      newComponent = this.addHall(length, startPoint[0], startPoint[1], startPoint[2], oldDungeon);
      type = 'hall';
    } else {

      // otherwise: make a room from a hall end
      startPoint = this.randomStartPoint(hallEnds);
      newComponent = this.addRoom(length, startPoint[0], startPoint[1], startPoint[2], oldDungeon);
      type = 'room';
    }

    return Object.assign({type, usedStartPoint: startPoint}, newComponent);
  }


//---------------------------------------------------ROOMS---------------------------------------------------//


  addRoom(length, startingX, startingY, roomDirection, oldDungeon, isInitial = false) {
    let startX, startY;
    let roomEntrances = [];
    let collision = false;
    const w = this.randomLength(length);
    const h = this.randomLength(length);
    const d = this.convertDirection(roomDirection);

    // first room is created in the middle
    if(isInitial) {
      startX = Math.floor(this.mapSize/2);
      startY = Math.floor(this.mapSize/2);
    } else {
      startX = ((roomDirection === 'up') || (roomDirection === 'down')) ? startingX - Math.floor(w / 2) : startingX;
      startY = ((roomDirection === 'right') || (roomDirection === 'left')) ? startingY - Math.floor(h / 2) : startingY;
    }

    const size = this.mapSize;
    const newDungeon = Object.assign({}, oldDungeon);
    const innerTiles = this.innerTiles(startX, startY, w, h, d);
    const wallTiles = this.wallTiles(startX, startY, w, h, d);

    // All tiles
    for(let x = startX; d[0] > 0 ?  x < startX + w : x > startX - w; d[0] > 0 ? x++ : x--) {
      for(let y = startY; d[1] > 0 ?  y < startY + h : y > startY - h; d[1] > 0 ? y++ : y--) {
        if ((x === 1) || (x === size - 1) || (y === 1) || (y === size - 1)) {
          collision = true; //Collision if map borders are 2 tiles away
        } else {
          newDungeon[[x, y]] = 'floor'; //assign all room tiles to 'floor'
        }
      }
    }

    // Inner Border Tiles
    innerTiles.forEach((tile) => {
      if (!collision) {
        const [x,y] = tile;
        if (tile[2] && (tile[2] !== this.oppositeDirection(roomDirection))) {
          roomEntrances.push(tile); // add 3 room entrances, excluding the starting one
        }
        // Collision if tile is a hall and not an entrance or assign 'entrance'
        if (oldDungeon[[x, y]] === 'hall') {
          tile[2] ? collision = true : newDungeon[[x,y]] = 'entrance';
        } else {
          newDungeon[[x,y]] = 'inner'; // assign all exterior room tiles to 'inner'
        }
      }
    })

    // wall Border Tiles
    wallTiles.forEach((tile) => {
      if (!collision) {
        const x = tile[0];
        const y = tile[1];
        // Collision if tile is a hall and not next to an entrance
        if (oldDungeon[[x, y]] === 'hall') {
          this.adjacentEntrance(x, y, newDungeon) ? newDungeon[[x,y]] = 'hall' : collision = true;
        // Collision if touching another room's wall tiles
        } else if (oldDungeon[[x, y]] === 'wall') {
          collision = true;
        } else {
          newDungeon[[x,y]] = 'wall'; // assign all bordering room tiles to 'wall'
        }
      }
    })

    // save the center point in each room created
    const roomCenter = this.findRoomCenter(startX, startY, w, h, d);

    // remove 1 or 2 entrances if not the first room
    if (!isInitial) {
      roomEntrances = this.filterRoomEntrances(roomEntrances);
    }

    return {
      collision,
      roomCenter,
      roomEntrances,
      grid: newDungeon
    }
  }

  wallTiles(startX, startY, w, h, d) {
    const tiles = [];
    for (let x = startX - d[0]; d[0] > 0 ? x < startX + w + 1 : x > startX - w - 1; x += d[0]) {
      if ((x === (startX - d[0])) || (x === startX + (d[0] * w))) {
        for (let y = startY - d[1]; d[1] > 0 ? y < startY + h + 1 : y > startY - h - 1; y += d[1]) {
          tiles.push([x,y]);
        }
      } else {
        for (let y = startY - d[1]; d[1] > 0 ? y < startY + h + 1 : y > startY - h - 1; y = y + (h * d[1]) + d[1]) {
          tiles.push([x,y]);
        }
      }
    }
    return tiles;
  }

  entranceDirection(startX, startY, w, h, d, x, y) {
    const midX = () => x === Math.floor(startX - (d[0] / 2) + (d[0] * w / 2));
    const midY = () => y === Math.floor(startY - (d[1] / 2) + (d[1] * h / 2));
    if (((d[1] > 0) && (y === startY) && midX()) || ((d[1] < 0) && (y === startY - h + 1) && midX())) {
      return 'up';
    } else if (((d[1] < 0) && (y === startY) && midX()) || ((d[1] > 0) && (y === startY + h - 1) && midX())) {
      return 'down';
    } else if (((d[0] > 0) && (x === startX) && midY()) || ((d[0] < 0) && (x === startX - w + 1) && midY())) {
      return 'left';
    } else if (((d[0] < 0) && (x === startX) && midY()) || ((d[0] > 0) && (x === startX + w - 1) && midY())) {
      return 'right';
    } else {
      return false;
    }
  }

  innerTiles(startX, startY, w, h, d) {
    const entranceDirections = [];
    const tiles = [];
    for (let x = startX; d[0] > 0 ? x < startX + w : x > startX - w; x += d[0]) {
      if ((x === startX) || (x === startX - d[0] + (d[0] * w))) {
        for (let y = startY; d[1] > 0 ? y < startY + h : y > startY - h; y += d[1]) {
          let direction = this.entranceDirection(startX, startY, w, h, d, x, y);
          let entrance = entranceDirections.indexOf(direction) === -1 ? direction : false;
          tiles.push([x,y,entrance]);
          entranceDirections.push(entrance); // TODO refactor
        }
      } else {
        for (let y = startY; d[1] > 0 ? y < startY + h : y > startY - h; y = y + (h * d[1]) - d[1]) {
          let direction = this.entranceDirection(startX, startY, w, h, d, x, y);
          let entrance = entranceDirections.indexOf(direction) === -1 ? direction : false;
          tiles.push([x,y,entrance]);
          entranceDirections.push(entrance); // TODO refactor
        }
      }
    }
    return tiles;
  }

  adjacentEntrance(startX, startY, newDungeon) {
    let adjacent = false;
    for (let x = startX -1; x <= startX + 1; x++) {
      for (let y = startY - 1; y <= startY + 1; y++) {
        if (newDungeon[[x, y]] === 'entrance') {
          adjacent = true;
        }
      }
    }
    return adjacent;
  }

  filterRoomEntrances(roomEntrances) {
    let roomsToDelete = Math.floor(Math.random() * 3);
    while (roomsToDelete > 0) {
      roomEntrances.splice((Math.floor(Math.random() * roomEntrances.length)),1);
      roomsToDelete--;
    }
    return roomEntrances;
  }


  findRoomCenter(x, y, w, h, d) {
    return [x + (d[0] * Math.floor(w / 2)), y + (d[1] * Math.floor(h / 2))];
  }


//---------------------------------------------------HALLS---------------------------------------------------//


  addHall(length, startX, startY, direction, oldDungeon) {
    let collision = false;
    let intersection = false;
    const w = ((direction === 'up') || (direction === 'down')) ? 1 : this.randomLength(length) + 2;
    const h = ((direction === 'up') || (direction === 'down')) ? this.randomLength(length) + 2 : 1;
    const d = this.convertDirection(direction);
    const size = this.mapSize;
    const newDungeon = Object.assign({}, oldDungeon);


    for(let x = startX; d[0] > 0 ?  x < startX + w : x > startX - w; d[0] > 0 ? x++ : x--) {
      for(let y = startY; d[1] > 0 ?  y < startY + h : y > startY - h; d[1] > 0 ? y++ : y--) {
        if (!collision && !intersection) {
          if ((x === 1) || (x === size - 1) || (y === 1) || (y === size - 1)) {
            collision = true; // Collision if map borders are 2 tiles away
          } else {
            if (oldDungeon[[x, y]] === 'inner') {
              newDungeon[[x, y]] = 'entrance'; // assign initial tile to entrance
            } else if (oldDungeon[[x, y]] === 'wall') {
              if (this.isSecondTile(x, y, startX, startY, d, direction)) {
                newDungeon[[x, y]] = 'hall'; // assign second tile to hall
              } else {
                collision = true;
              }
            } else if (oldDungeon[[x, y]] === 'hall') {
              intersection = [x,y,direction];
            } else {
              newDungeon[[x, y]] = 'hall';
            }
          }
        }
      }
    }

    const hallEnd = intersection ? intersection : this.findHallEnd(startX, startY, w, h, direction);

    return {collision, hallEnd, grid: newDungeon};
  }

  isSecondTile(x, y, startX, startY, d, direction) {
    if ((direction === 'up') || (direction === 'down')) {
      return y === startY + d[1];
    } else {
      return x === startX + d[0];
    }
  }

  findHallEnd(startX, startY, w, h, direction) {
    switch (direction) {
      case 'up':
        return [startX, startY - h + 1, 'up'];
      case 'down':
        return [startX, startY + h - 1, 'down'];
      case 'left':
        return [startX - w + 1, startY, 'left'];
      case 'right':
        return [startX + w - 1, startY, 'right'];
      default: break;
    }
  }


//--------------------------------------------------INITIAL--------------------------------------------------//


  firstRoom() {
    const x = this.randomCoord(this.mapSize);
    const y = this.randomCoord(this.mapSize);
    const direction = this.randomDirection();
    return [x, y, direction];
  }

  initializeGrid() {
    const grid = {};
    for(let x = 0; x < this.mapSize; x++) {
      for(let y = 0; y < this.mapSize; y++) {
        grid[[x, y]] = null;
      }
    }
    return Object.assign({}, grid);
  }

  initializeDungeon(length) {
    const initialRoom = this.addRoom(length, ...this.firstRoom(), this.initializeGrid(), true);
    return {
      grid: initialRoom.grid,
      collision: initialRoom.collision,
      roomEntrances: initialRoom.roomEntrances,
      usedStartPoint: [],
      type: 'room',
      usedStartPointType: false
    }
  }


//-----------------------------------------------MISCELLANEOUS-----------------------------------------------//


  convertDirection(direction) {
    switch (direction) {
      case 'up':
        return [1, -1];
      case 'left':
        return [-1, 1];
      default:
        return [1, 1];
    }
  }

  oppositeDirection(direction) {
    switch (direction) {
      case 'up':
        return 'down';
      case 'down':
        return 'up';
      case 'left':
        return 'right';
      case 'right':
        return 'left';
      default: break;
    }
  }

  randomDirection() {
    const randomNumber = Math.random();
    if (randomNumber > .75) {
      return 'up';
    } else if (randomNumber > .5) {
      return 'down';
    } else if (randomNumber > .25) {
      return 'left';
    } else {
      return 'right';
    }
  }

  randomCoord(size) {
    return Math.floor(size / 2 + (Math.random() * (size / 5)) * (Math.random() < .5 ? 1 : -1));
  }

  randomLength(length) {
    return Math.floor((length / 2) + (Math.random() * length));
  }

  randomStartPoint(list) {
    return list[Math.floor(Math.random() * list.length)];
  }


//-----------------------------------------------FINALIZATION-----------------------------------------------//


  finalizeDungeon(grid, hallEnds, roomCenters) {
    roomCenters.forEach((center) => {
      grid[center] = 'center';
    })
    grid = hallEnds.length === 1 ? this.hallClipper(grid, hallEnds) : grid;
    return grid;
  }

  adjacentHallCheck(grid, x, y) { // in case a hall starts from a hall end
    let adjacentHallCount = 0;
    if (grid[[x, y - 1]] === 'hall') {adjacentHallCount++;}
    if (grid[[x, y + 1]] === 'hall') {adjacentHallCount++;}
    if (grid[[x - 1, y]] === 'hall') {adjacentHallCount++;}
    if (grid[[x + 1, y]] === 'hall') {adjacentHallCount++;}
    return adjacentHallCount > 1;
  }

  hallClipper(grid, hallEnds) { //
    let x = hallEnds[0][0];
    let y = hallEnds[0][1];
    const direction = hallEnds[0][2];
    if (this.adjacentHallCheck(grid, x, y)) {
      return grid;
    } else {
      while (grid[[x,y]] !== 'entrance') {
        switch (direction) {
          case 'up':
            grid[[x, y]] = null;
            y++;
            break;
          case 'down':
            grid[[x, y]] = null;
            y--;
            break;
          case 'left':
            grid[[x, y]] = null;
            x++;
            break;
          case 'right':
            grid[[x, y]] = null;
            x--;
            break;
          default: break;
        }
      }
      switch (direction) {
        case 'up':
          grid[[x, y]] = 'inner';
          grid[[x, y - 1]] = 'wall';
          break;
        case 'down':
          grid[[x, y]] = 'inner';
          grid[[x, y + 1]] = 'wall';
          break;
        case 'left':
          grid[[x, y]] = 'inner';
          grid[[x - 1, y]] = 'wall';
          break;
        case 'right':
          grid[[x,y]] = 'inner';
          grid[[x + 1, y]] = 'wall';
          break;
        default: break;
      }
      return grid;
    }
  }
}

export default Dungeon;
