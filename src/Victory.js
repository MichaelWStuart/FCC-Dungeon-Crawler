import React, { Component } from 'react';

class Victory extends Component {

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0,0,0,.5)';
    ctx.fillRect(0,0,352,352);
    ctx.font = '8px Aladin';
    ctx.fillStyle = '#A5A96D';
    ctx.fillText('<hooray>', 160, 170);
    ctx.font = '20px Aladin';
    ctx.fillText('(click to restart)', 110, 205);
  }

  render() {
    return(
      <canvas id='victory' className='canvas-overlay'
        onClick={() => this.props.setVictory(false)}
        width={this.props.viewSize}
        height={this.props.viewSize} ref='canvas'/>
    )
  }
}

export default Victory;
