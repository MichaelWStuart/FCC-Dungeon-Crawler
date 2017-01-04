import React, { Component } from 'react';

class FogOfWar extends Component {

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(176,176,176,100,100,0);
    gradient.addColorStop(0,'#000000');
    gradient.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,352,352);
  }

  render() {
    return(
      <canvas className='canvas-overlay' width={this.props.viewSize} height={this.props.viewSize} ref='canvas'/>
    )
  }
}

export default FogOfWar;
