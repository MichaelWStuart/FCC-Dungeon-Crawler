import React, { Component } from 'react';
import longWep from './LongWep.png';

class Weapon extends Component {

  componentDidMount() {
    const canvas = this.refs.weapon;
    this.ctx = canvas.getContext('2d');
    this.drawSwordIcon();
  }

  drawSwordIcon() {
    const img = new Image();
    img.src = longWep;
    img.onload = () => this.ctx.drawImage(img, 0, 16, 16, 15, 0, 0, 40, 40);
  }

  render() {
    return (
      <div id='weapon' className='toggle-show'>
        <canvas id='weapon-icon' width='48' height='48' ref='weapon'/>
        <div id='weapon-info'>
          <div>{this.props.weapon.name}</div>
          <div>{`${this.props.weapon.damage[0]} to ${this.props.weapon.damage[1]} Damage`}</div>
        </div>
      </div>
    )
  }
}

export default Weapon;
