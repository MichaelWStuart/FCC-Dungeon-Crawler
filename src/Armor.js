import React, { Component } from 'react';
import shield from './Shield.png';

class Armor extends Component {

  componentDidMount() {
    const canvas = this.refs.armor;
    this.ctx = canvas.getContext('2d');
    this.drawShieldIcon();
  }

  drawShieldIcon() {
    const img = new Image();
    img.src = shield;
    img.onload = () => this.ctx.drawImage(img, 96, 0, 16, 16, 0, 0, 40, 40);
  }

  render() {
    return (
      <div id='armor' className='toggle-show'>
        <canvas id='armor-icon' width='48' height='48' ref='armor'/>
        <div id='armor-info'>
          <div>{this.props.armor.name}</div>
          <div>{`${this.props.armor.defense} Defense`}</div>
        </div>
      </div>
    )
  }
}

export default Armor;
