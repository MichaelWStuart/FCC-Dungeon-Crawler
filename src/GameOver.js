import React, { Component } from 'react';

class GameOver extends Component {

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0,0,0,.5)';
    ctx.fillRect(0,0,352,352);
    ctx.font = '48px Aladin';
    ctx.fillStyle = 'red';
    ctx.fillText('Game Over', 70, 170);
    ctx.font = '20px Aladin';
    ctx.fillText('(click to restart)', 110, 205);
  }

  render() {
    return(
      <canvas id='game-over' className='canvas-overlay' onClick={() => this.props.setGameOver(false)} width={this.props.viewSize} height={this.props.viewSize} ref='canvas'/>
    )
  }
}

export default GameOver;
