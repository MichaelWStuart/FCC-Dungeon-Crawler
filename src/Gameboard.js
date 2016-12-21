import React, { Component } from 'react';

class Gameboard extends Component {

  componentDidMount() {
    const canvas = this.refs.gameBoard;
    this.ctx = canvas.getContext('2d');
    this.drawGameBoard();
  }

  componentDidUpdate() {
    this.drawGameBoard();
  }

  addTextures(dx,dy,x,y) {
    switch (this.props.dungeon[[x,y]]) {
      case 'blank':
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(dx, dy, 32, 32)
        break;
      case 'wall':
        this.ctx.fillStyle = 'grey'
        this.ctx.fillRect(dx, dy, 32, 32)
        break;
      case 'floor':
        const img = new Image();
        img.onload = () => this.ctx.drawImage(img, dx, dy, 32, 32);
        img.src = 'https://addons.cdn.mozilla.net/user-media/addons/540180/icon.png?1409574029';
        break;
      default:
        break;
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
