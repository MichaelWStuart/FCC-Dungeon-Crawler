import React, { Component } from 'react';

class Entities extends Component {

  componentDidMount() {
    const canvas = document.getElementById('entities');
    this.ctx = canvas.getContext('2d');
    this.drawEntities();
  }

  componentDidUpdate() {
    this.ctx.clearRect(0, 0, 352, 352);
    this.drawEntities();
  }

  addEntity(dx,dy,x,y) {
    switch (this.props.dungeon[[x,y]]) {
      case 'entry':
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(dx, dy, 32, 32);
        break;
      case 'exit':
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(dx, dy, 32, 32);
        break;
      case 'monster':
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(dx, dy, 32, 32);
        break;
      case 'treasure':
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillRect(dx, dy, 32, 32);
        break;
      default: break;
    }
  }

  drawEntities() {
    let gameBoardX, gameBoardY;
    for (let x = this.props.position[0] - 5; x <= this.props.position[0] + 5; x++) {
      for (let y = this.props.position[1] - 5; y <= this.props.position[1] + 5; y++) {
        gameBoardX = (x - (this.props.position[0] - 5)) * 32;
        gameBoardY = (y - (this.props.position[1] - 5)) * 32;
        this.addEntity(gameBoardX, gameBoardY, x, y);
      }
    }
    this.ctx.fillStyle = 'pink'
    this.ctx.fillRect(160, 160, 32, 32)
  }

  render() {
    return(
      <div>
        <canvas id='entities' width='352' height='352'/>
      </div>
    )
  }
}

export default Entities;
