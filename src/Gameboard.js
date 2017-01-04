import React, { Component } from 'react';
import floor from './Floor.png';
import wall from './Wall.png';

class Gameboard extends Component {
  constructor(props) {
    super(props);
    this.floorTextureSelect = this.floorTextureSelect.bind(this);
    this.wallTextureSelect = this.wallTextureSelect.bind(this);
  }
  componentDidMount() {
    const canvas = this.refs.gameBoard;
    this.ctx = canvas.getContext('2d');
    this.drawGameBoard();
  }

  componentDidUpdate() {
    this.drawGameBoard();
  }

  floorTextureSelect() {
    switch (this.props.dungeonLevel) {
      case 1:
        return [0,288];
      case 2:
      case 6:
        return [0,96];
      case 3:
      case 7:
        return [0,144];
      case 4:
        return [0,192];
      case 5:
        return [0,48];
      case 8:
        return [112,384];
      case 9:
        return [112,336];
      case 10:
        return [0,0];
      default: break;
    }
  }

  wallTextureSelect() {
    switch (this.props.dungeonLevel) {
      case 1:
        return [0,240];
      case 2:
        return [112,240];
      case 3:
        return [112,336];
      case 4:
        return [112,384];
      case 5:
        return [0,48];
      case 6:
        return [0,96];
      case 7:
        return [0,192];
      case 8:
        return [224,336];
      case 9:
        return [112,192];
      case 10:
        return [224,192];
      default: break;
    }
  }

  hallTiles(x,y) {
    const [X,Y] = this.floorTextureSelect();
    const up = this.props.dungeon[[x,y-1]];
    const down = this.props.dungeon[[x,y+1]];
    const left = this.props.dungeon[[x-1,y]];
    const right = this.props.dungeon[[x+1,y]];
    if ((up === 'wall') && (down === 'wall')) {
      //hall with top/bottom borders
      return [X + 80, Y + 16];
    } else if ((up === 'wall') && !down) {
      //hall with top/bottom borders
      return [X + 80, Y + 16];
    } else if (!up && (down === 'wall')) {
      //hall with top/bottom borders
      return [X + 80, Y + 16];
    } else if ((up === 'hall') && !down) {
      //floor with bottom border
      return [X + 16, Y + 32];
    } else if ((down === 'hall') && !up) {
      //floor with top border
      return [X + 16, Y];
    } else if ((left === 'wall') && (right === 'wall')) {
      //hall with left/right borders
      return [X + 48, Y + 16];
    } else if ((left === 'wall') && !right) {
      //hall with left/right borders
      return [X + 48, Y + 16];
    } else if (!left && (right === 'wall')) {
      //hall with left/right borders
      return [X + 48, Y + 16];
    } else if ((left === 'hall') && !right) {
      //floor with right border
      return [X + 32, Y + 16];
    } else if ((right === 'hall') && !left) {
      //floor with left border
      return [X + 0, Y + 16];
    } else if (!up && !down) {
      //hall with top/bottom borders
      return [X + 80, Y + 16];
    } else if (!left && !right) {
      //hall with left/right borders
      return [X + 48, Y + 16];
    }
  }

  innerTiles(x,y) {
    const [X,Y] = this.floorTextureSelect()
    const up = this.props.dungeon[[x,y-1]];
    const down = this.props.dungeon[[x,y+1]];
    const left = this.props.dungeon[[x-1,y]];
    const right = this.props.dungeon[[x+1,y]];
    if (up === 'wall') {
      if (((down === 'inner') || (down === 'entrance')) && (left === 'wall')) {
        //floor with top/left borders
        return [X + 0, Y];
      } else if (((down === 'inner') || (down === 'entrance')) && (right === 'wall')) {
        //floor with top/right borders
        return [X + 32, Y];
      } else {
        //floor with top border
        return [X + 16, Y];
      }
    } else if (down === 'wall') {
      if (((up === 'inner') || (up === 'entrance')) && (left === 'wall')) {
        //floor with bottom/left borders
        return [X + 0, Y + 32];
      } else if (((up === 'inner') || (up === 'entrance')) && (right === 'wall')) {
        //floor with bottom/right borders
        return [X + 32, Y + 32];
      } else {
        //floor with bottom border
        return [X + 16, Y + 32];
      }
    } else if (left === 'wall') {
      if (((right === 'inner') || (right === 'entrance')) && (up === 'wall')) {
        //floor with top/left borders
        return [X + 0, Y];
      } else if (((right === 'inner') || (right === 'entrance')) && (down === 'wall')) {
        //floor with bottom/left borders
        return [X + 0, Y + 32];
      } else {
        //floor with left border
        return [X + 0, Y + 16];
      }
    } else if (right === 'wall') {
      if (((left === 'inner') || (left === 'entrance')) && (up === 'wall')) {
        //floor with top/right borders
        return [X + 32, Y];
      } else if (((left === 'inner') || (left === 'entrance')) && (down === 'wall')) {
        //floor with bottom/right borders
        return [X + 32, Y + 32];
      } else {
        //floor with right border
        return [X + 32, Y + 16];
      }
    }
  }

  wallTiles(x,y) {
    const [X, Y] = this.wallTextureSelect()
    const up = this.props.dungeon[[x,y-1]];
    const down = this.props.dungeon[[x,y+1]];
    const left = this.props.dungeon[[x-1,y]];
    const right = this.props.dungeon[[x+1,y]];
    const upLeft = this.props.dungeon[[x-1,y-1]];
    const downLeft = this.props.dungeon[[x-1,y+1]];
    const downRight = this.props.dungeon[[x+1,y+1]];
    const upRight = this.props.dungeon[[x+1,y-1]];
    if ((left === 'hall') && ((down === 'inner') || (up === 'inner'))) {
      //wall with top/left/bottom borders
      return [X + 16, Y];
    } else if ((right === 'hall') && ((down === 'inner') || (up === 'inner'))) {
      //wall with top/right/bottom borders
      return [X + 16, Y];
    } else if ((up === 'hall') && ((left === 'inner') || (right === 'inner'))) {
      //wall with top/left/right borders
      return [X + 0, Y + 16];
    } else if ((down === 'hall') && ((left === 'inner') || (right === 'inner'))) {
      //wall with bottom/left/right borders
      return [X + 16, Y + 16];
    } else if ((upLeft === 'inner') && (up === 'wall') && (left === 'wall')) {
      //bottom-right wall corner
      return [X + 32, Y + 32];
    } else if ((downLeft === 'inner') && (down === 'wall') && (left === 'wall')) {
      //top-right wall corner
      return [X + 32, Y];
    } else if ((upRight === 'inner') && (up === 'wall') && (right === 'wall')) {
      //bottom-left wall corner
      return [X + 0, Y + 32];
    } else if ((downRight === 'inner') && (down === 'wall') && (right === 'wall')) {
      //top-left wall corner
      return [X + 0, Y];
    } else if (up === 'inner') {
      //bottom wall
      return [X + 16, Y];
    } else if (down === 'inner') {
      //top wall
      return [X + 16, Y];
    } else if (left === 'inner') {
      //right wall
      return [X + 0, Y + 16];
    } else if (right === 'inner') {
      //left wall
      return [X + 0, Y + 16];
    }
  }

  addTextures(dx,dy,x,y) {
    const img = new Image();
    switch (this.props.dungeon[[x,y]]) {
      case null:
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(dx, dy, 32, 32);
        break;
      case 'floor':
      case 'entrance':
        const [X,Y] = this.floorTextureSelect();
        img.src = floor;
        img.onload = () => this.ctx.drawImage(img, X + 16, Y + 16, 16, 16, dx, dy, 32, 32);
        break;
      case 'hall':
        img.src = floor;
        img.onload = () => this.ctx.drawImage(img, ...this.hallTiles(x,y), 16, 16, dx, dy, 32, 32);
        break;
      case 'inner':
        img.src = floor;
        img.onload = () => this.ctx.drawImage(img, ...this.innerTiles(x,y), 16, 16, dx, dy, 32, 32);
        break;
      case 'wall':
        img.src = wall;
        img.onload = () => this.ctx.drawImage(img, ...this.wallTiles(x,y), 16, 16, dx, dy, 32, 32);
        break;
      default: break;
    }
  }

  drawGameBoard() {
    let gameBoardX, gameBoardY;
    for (let x = this.props.position[0] - 5; x <= this.props.position[0] + 5; x++) {
      for (let y = this.props.position[1] - 5; y <= this.props.position[1] + 5; y++) {
        gameBoardX = (x - (this.props.position[0] - 5)) * 32;
        gameBoardY = (y - (this.props.position[1] - 5)) * 32;
        this.addTextures(gameBoardX, gameBoardY, x, y);
      }
    }
  }

  render() {
    return(
      <div id='container'>
        <canvas id='gameboard' width='352' height='352' ref='gameBoard'/>
      </div>
    )
  }
}

export default Gameboard;
